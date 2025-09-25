import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./containers/Navigation";
import Cart from "./pages/Cart";
import Market from "./pages/Market/Market";
import Footer from "./containers/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/signup/indeex";
import Profile from "./pages/Dashboard/Profile";
import Statistics from "./pages/Dashboard/Statistics";
import LogoutPage from "./pages/Dashboard/LogoutPage";
import DashboardLayout from "./pages/Dashboard/Dashboardlayout";
import ReviewPage from "./pages/leaveReview";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/Upload";
import PaymentSuccess from "./pages/response_pages/Success";
import PaymentError from "./pages/response_pages/Failure";
import { CartProvider } from "./Context/Context";
import { useEffect, useState } from "react";
import { api } from "./API/Registration";
import type { UserProps } from "./types/UserRead";
import Portfolio from "./portfolio/Portfolio";
import Order from "./pages/Dashboard/Order";
import AdminDashBoard from "./pages/Admin";

function App() {
  const [user, setUser] = useState<UserProps>()
  const [error, setError] = useState("")
  const token = localStorage.getItem("token")
    //  Fetch user
    useEffect(() => {
      api
        .get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) =>{ setUser(res.data); console.log(error)})
        .catch(() => setError("Failed to fetch user"));
    }, []);
  return (
    <div>
      <CartProvider userId={user?.id}>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/market" element={<Market />}/>
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/error" element={<PaymentError />} />
            <Route path="/upload" element={<AddProduct />} />
            <Route path="/portfolio" element={<Portfolio />} />


            {/* Dashboard nested routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Order />} />{" "}
              {/* Default page for /dashboard */}
              <Route path="order" element={<Order />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="profile" element={<Profile />} />
              <Route path="logout" element={<LogoutPage />} />
            </Route>

            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products/:id/review" element={<ReviewPage />} />
            <Route path="/admin" element ={ <AdminDashBoard />}/>
          </Routes>

          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
