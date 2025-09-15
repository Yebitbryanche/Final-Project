// src/pages/AddProduct.tsx
import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
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

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  // Show toast helper
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Fetch related products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        const data = await res.json();
        const formatted = data.map((p: any) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          image: p.image,
          stock: 0,
          category: p.category || "Uncategorized",
          description: p.description || "",
        }));
        setRelatedProducts(formatted);
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };
    fetchProducts();
  }, []);

  // Fake admins
  useEffect(() => {
    setAdmins([
      { id: 1, name: "Donfack", avatar: "/Avatar.png", uploadedAt: "2 mins ago" },
      { id: 2, name: "Angela", avatar: "/Avatar.png", uploadedAt: "10 mins ago" },
      { id: 3, name: "Darios", avatar: "/Ellipse 1.png", uploadedAt: "1 hour ago" },
    ]);
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Reset form
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

  // Handle submit
  const handleSubmit = () => {
    if (!productName || !category || !price || !stock) {
      showToast("⚠️ Please fill all required fields!", "error");
      return;
    }

    if (editingProductId) {
      // Update product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                name: productName,
                price: Number(price),
                stock: Number(stock),
                category,
                description,
                image: previewImages.length > 0 ? previewImages[0] : p.image,
              }
            : p
        )
      );
      showToast("✅ Product updated successfully!", "success");
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now(),
        name: productName,
        price: Number(price),
        stock: Number(stock),
        category,
        description,
        image:
          previewImages.length > 0
            ? previewImages[0]
            : "https://via.placeholder.com/150",
      };
      setProducts((prev) => [...prev, newProduct]);
      showToast("✅ Product added successfully!", "success");
    }

    resetForm();
  };

  // Handle edit
  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setProductName(product.name);
    setCategory(product.category);
    setStock(product.stock);
    setPrice(product.price);
    setDescription(product.description);
    setPreviewImages([product.image]);
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("🗑️ Product deleted successfully!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#b0c4aa] text-secondary">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-secondary text-white shadow">
        <h1 className="text-xl font-bold">Add Products</h1>
        <div className="flex items-center gap-4">
          <img src="/YEMELE.png" alt="profile" className="w-10 h-10 rounded-full border-2 " />
          <span className="font-medium">My Account</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary">
          <h3 className="font-semibold text-lg mb-3 text-secondary">Product Images</h3>
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
                    setPreviewImages((prev) => prev.filter((_, idx) => idx !== i));
                    setImages((prev) => prev.filter((_, idx) => idx !== i));
                  }}
                >
                  <FaTrash className="text-[--color-primary] text-xs" />
                </button>
              </div>
            ))}
            <label className="w-full h-24 border-2 border-dashed border-secondary rounded-lg flex items-center justify-center cursor-pointer hover:bg-tertiary">
              <FaPlus className="text-secondary" />
              <input type="file" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        {/* Related Items */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary">
          <h3 className="font-semibold text-lg mb-3 text-secondary">Related Items</h3>
          <div className="space-y-3">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border border-tertiary rounded-lg p-2 hover:bg-tertiary/40"
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-primary text-xs">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Activity */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary">
          <h3 className="font-semibold text-lg mb-3 text-secondary">Admin Activity</h3>
          <div className="space-y-3">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center gap-3 border border-tertiary rounded-lg p-2 hover:bg-tertiary/40"
              >
                <img
                  src={admin.avatar}
                  alt={admin.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="text-sm font-medium">{admin.name}</p>
                  <p className="text-gray-500 text-xs">Uploaded {admin.uploadedAt}</p>
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

        {/* Uploaded Products Table */}
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow-xl border border-tertiary mt-6">
          <h3 className="text-lg font-semibold mb-4 text-secondary">Uploaded Products</h3>
          {products.length === 0 ? (
            <p className="text-gray-500 text-sm">No products uploaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-tertiary rounded-lg overflow-hidden">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-tertiary hover:bg-tertiary/30"
                    >
                      <td className="p-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">${p.price}</td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3 flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
};

export default AddProduct;
