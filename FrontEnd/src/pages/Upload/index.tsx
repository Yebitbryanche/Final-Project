import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaUserCircle } from "react-icons/fa";
import { api } from "../../API/Registration";
import type ProductProps from "../../types/products";
import type { Admin, UserProps } from "../../types/UserRead";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";



function AddProduct() {

  const token = localStorage.getItem("token")
  const [user, setUser] = useState<UserProps>()
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [description, setDescription] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [image, setImageUrl] = useState("");
  const [deleteProduct, setDeleteProduct] = useState<ProductProps | null>(null)
  const [editingProduct, setEditingProduct] = useState<ProductProps | null>(null);
  const [products,setProducts] = useState<ProductProps[]>([])
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  // Modal states for delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductProps | null>(null);

  

const handleEdit = async () => {
  if (!editingProduct?.id) return;

  try {
    const response = await api.put(`/users/update/${editingProduct.id}`, {
      title,
      description,
      price,
      stock,
      image,
      category,
    });

    const updatedProduct = response.data;

    // ✅ update only the edited product
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id ? updatedProduct : p
      )
    );

    showToast("Product updated successfully", "success");
    resetForm();
    setEditingProduct(null);
  } catch (error: any) {
    console.error("Failed to update product:", error.message);
    showToast("Failed to update product", "error");
  }
};

console.log(editingProduct?.id)



    const resetForm = () => {
    setTitle("");
    setCategory("");
    setStock("");
    setPrice("");
    setImageUrl("")
    setDescription("");
    setPreviewImages([]);
     };

  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const storedUser = localStorage.getItem("user"); 
        if (storedUser) { const user = JSON.parse(storedUser); 
          if (user.role === "admin") { 
            setAdmins([ 
              { id: Date.now(), name: user.user_name, avatar: user.avatar || "/Avatar.png", uploadedAt: "Just now", }, 
            ]); } 
            else { 
              navigate("/signup", { replace: true }); } } else { navigate("/signup", { replace: true }); 
            }
        setUser(res.data);
      });
  }, []);

    
  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!user) {
    showToast("User not logged in", "error");
    return;
  }
  try {
    const res = await api.post("/users/upload", {
      title,
      description,
      price,
      stock,
      image,
      category,
      admin_id: user.id, // guaranteed to exist
    });
    console.log("added successfully", res.data);
    resetForm();
    showToast("Product uploaded successfully", "success");
  } catch (err: any) {
    console.log(err.message);
    showToast("Failed to upload product", "error");
  }
};


useEffect(() => {
  if (!user) return;

  api.get(`/users/products/${user.id}`)
    .then(res => {
      console.log("Fetched products:", res.data);
      setProducts(res.data); // ✅ actually store in state
      setEditingProduct(res.data)
      setDeleteProduct(res.data)
    })
    .catch(err => console.log(err));
}, [user]);

// delete function
const handleDelete = async (productId: number) => {
  if (!productId) return;

  try {
    await api.delete(`/users/delete/${productId}`);

    // Remove the deleted product from state so UI updates
    setProducts((prev) => prev.filter((p) => p.id !== productId));

    showToast("Product deleted successfully", "success");
  } catch (err: any) {
    console.error("Failed to delete product:", err.message);
    console.log(deleteProduct)
    showToast("Failed to delete product", "error");
  }
};




  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
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
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md">
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
              />
            </label>
          </div>
        </div>

        {/* Admin Activity */}
        <div className="bg-white rounded-lg p-4 shadow border border-tertiary lg:col-span-1">
          <h3 className="font-semibold text-lg mb-3 text-secondary">
            Admin Activity
          </h3>
          <div className="space-y-3">
            {admins.map((admin) => ( <div key={admin.id} className="flex items-center gap-3 border border-tertiary rounded-lg p-2 hover:bg-tertiary/40" > <img src={admin.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-primary" /> <div> <p className="text-sm font-medium">{admin.name}</p> <p className="text-gray-500 text-xs"> Uploaded {admin.uploadedAt} </p> </div> </div> ))}
          </div>
        </div>

        {/* Product Form */}
        <form className="lg:col-span-3 bg-white rounded-lg p-6 shadow-xl border border-tertiary"
        onSubmit={upload}>
          <h3 className="text-lg font-semibold mb-4 text-secondary">
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name *"
              className="border border-tertiary p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Price *"
              className="border border-tertiary p-3 rounded-lg focus:ring-2 focus:ring-primary"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />

            <input
              type="text"
              placeholder=" enter image URL"
              className="border border-tertiary p-3 rounded-lg w-full focus:ring-2 focus:ring-primary"
              value={image}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
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
              onClick={editingProduct ? handleEdit : undefined} // only call handleEdit if editingProduct exists
              disabled={!editingProduct}                        // disable button if no product
              className={`px-4 py-2 rounded-lg text-white hover:bg-orange-600 ${
                editingProduct
                  ? "bg-primary"
                  : "bg-primary/30 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-600"
            >
              Upload
            </button>
          </div>
        </form>
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

      {/* Uploaded Products */}
      <div className="bg-white rounded-lg p-4 shadow border border-tertiary lg:col-span-1">
        <h3 className="font-semibold text-lg mb-3 text-secondary">
          Uploaded Products
        </h3>
{products.length === 0 ? (
  <p className="text-gray-500 text-sm text-center py-4">
    No products uploaded yet.
  </p>
) : (
  <div className="space-y-4">
    {products.map((item) => (
      <div
        key={item.id}
        className="flex items-center bg-tertiary justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
      >
        {/* Product Image */}
        <img
          src={`http://127.0.0.1:8000/images/${item.image}`}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-md mr-4"
        />

        {/* Product Details */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-primary">{item.title}</p>
          <p className="text-secondary text-sm mt-1">{item.price} XAF</p>
          <p className="text-gray-500 text-xs mt-1">{item.category}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setEditingProduct(item);
            setTitle(item.title);
            setCategory(item.category);
            setStock(item.stock);
            setPrice(item.price);
            setImageUrl(item.image);
            setDescription(item.description);
          }}
          className="px-3 py-1 bg-primary text-white text-sm rounded cursor-pointer hover:bg-primary/90 transition-colors"
        >
          Edit
        </button>

          <button
          onClick={() => {
                      setProductToDelete(item);
                      setShowDeleteModal(true);
                    }}
            className="px-3 py-1 bg-secondary text-white text-sm rounded cursor-pointer hover:bg-secondary/90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      </div>
 {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (productToDelete) {
            handleDelete(productToDelete.id);
            setShowDeleteModal(false);
            setProductToDelete(null);
          }
        }}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.title}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

    </div>
  );
}

export default AddProduct;
