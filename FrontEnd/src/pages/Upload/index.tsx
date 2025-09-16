// src/pages/AddProduct.tsx
import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaUserCircle } from "react-icons/fa";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  description: string;
}

interface Admin {
  id: number;
  name: string;
  avatar: string;
  uploadedAt: string;
}

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  // Retrieve logged-in admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role) {
        setAdmins([
          {
            id: Date.now(),
            name: user.user_name,
            avatar: user.avatar || "/Avatar.png",
            uploadedAt: "Just now",
          },
        ]);
      } else {
        setAdmins([]);
      }
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setStock("");
    setPrice("");
    setDescription("");
    setImages([]);
    setPreviewImages([]);
    setEditingProductId(null);
  };

  const handleSubmit = async () => {
    if (!productName || !category || !price || !stock) {
      showToast("⚠️ Please fill all required fields!", "error");
      return;
    }

    try {
      const payload = {
        title: productName,
        category,
        stock,
        price,
        description,
        image: previewImages[0] || "https://via.placeholder.com/150",
      };

      if (editingProductId) {
        // Update existing product
        const res = await axios.put(
          `http://127.0.0.1:8000/users/update/${editingProductId}`,
          payload
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProductId ? res.data : p))
        );
        showToast("✅ Product updated successfully!", "success");
      } else {
        // Add new product
        const res = await axios.post(
          "http://127.0.0.1:8000/users/upload",
          payload
        );
        setProducts((prev) => [...prev, res.data]);
        showToast("✅ Product added successfully!", "success");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      showToast("Failed to upload product", "error");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setProductName(product.title);
    setCategory(product.category);
    setStock(product.stock);
    setPrice(product.price);
    setDescription(product.description);
    setPreviewImages([product.image]);
  };
  

  const handleDelete = async (id: number) => {
    if (!id || isNaN(id)) {
      console.error("Invalid product id:", id);
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/users/delete/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("🗑️ Product deleted successfully!", "success");
    } catch (error) {
      console.error("Delete failed:", error);
      showToast("❌ Failed to delete product", "error");
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-tertiary/70 text-secondary mt-[5rem]">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-secondary text-white shadow">
        <h1 className="text-xl font-bold">Add Products</h1>
        <div className="flex items-center gap-4">
          {localStorage.getItem("profilePic") ? (
            <img
              src={localStorage.getItem("profilePic") as string}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 object-cover"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-500" />
          )}
          <span className="font-medium">My Account</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary">
          <h3 className="font-semibold text-lg mb-3 text-secondary">
            Product Images
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {previewImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-lg border border-tertiary"
                />
                <button
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md"
                  onClick={() => {
                    setPreviewImages((prev) =>
                      prev.filter((_, idx) => idx !== i)
                    );
                    setImages((prev) => prev.filter((_, idx) => idx !== i));
                  }}
                >
                  <FaTrash className="text-[--color-primary] text-xs" />
                </button>
              </div>
            ))}
            <label className="w-full h-24 border-2 border-dashed border-secondary rounded-lg flex items-center justify-center cursor-pointer hover:bg-tertiary">
              <FaPlus className="text-secondary" />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Uploaded Products */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary lg:col-span-1">
          <h3 className="font-semibold text-lg mb-3 text-secondary">
            Uploaded Products
          </h3>
          <div className="space-y-3">
            {products.length === 0 ? (
              <p className="text-gray-500 text-sm">No products uploaded yet.</p>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border border-tertiary rounded-lg p-2 hover:bg-tertiary/40"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-primary text-xs">{item.price} XAF</p>
                  </div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-2 py-1 bg-primary text-white text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Admin Activity */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary lg:col-span-1">
          <h3 className="font-semibold text-lg mb-3 text-secondary">
            Admin Activity
          </h3>
          <div className="space-y-3">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center gap-3 border border-tertiary rounded-lg p-2 hover:bg-tertiary/40"
              >
                <img
                  src={admin.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="text-sm font-medium">{admin.name}</p>
                  <p className="text-gray-500 text-xs">
                    Uploaded {admin.uploadedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Form */}
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow-xl border border-tertiary">
          <h3 className="text-lg font-semibold mb-4 text-secondary">
            {editingProductId ? "Edit Product" : "Product Details"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name *"
              className="border border-tertiary p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <select
              className="border border-tertiary p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category *</option>
              <option value="Perfume">Perfume</option>
              <option value="Body Wash">Body Wash</option>
              <option value="Backpacks">Backpacks</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Shoes">Shoes</option>
            </select>

            <input
              type="number"
              placeholder="Stock *"
              className="border border-tertiary p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Price *"
              className="border border-tertiary p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <textarea
            placeholder="Description"
            className="border border-tertiary p-3 rounded-lg w-full mt-4 focus:ring-2 focus:ring-primary"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-[--color-secondary] text-[--color-secondary] rounded-lg hover:bg-[--color-tertiary]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600"
            >
              {editingProductId ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed bottom-6 left-6 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-500 w-72 text-center ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default AddProduct;
function res() {
  throw new Error("Function not implemented.");
}
