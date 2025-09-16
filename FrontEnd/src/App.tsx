import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./containers/Navigation";
import Cart from "./pages/Cart";
import Market from "./pages/Market/Market";
import Footer from "./containers/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/signup/indeex";
import Profile from "./pages/Dashboard/Profile";
import Order from "./pages/Dashboard/Order";
import Statistics from "./pages/Dashboard/Statistics";
import LogoutPage from "./pages/Dashboard/LogoutPage";
import DashboardLayout from "./pages/Dashboard/Dashboardlayout";
import ReviewPage from "./pages/leaveReview";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/market" element={<Market />}/>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/market" element={<Market />} />

          {/* Dashboard nested routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Order />} />{" "}
            {/* Default page for /dashboard */}
            <Route path="order" element={<Order />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="logout"/>
          <Route path="/products/:id/review" element={<ReviewPage/>}/>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
