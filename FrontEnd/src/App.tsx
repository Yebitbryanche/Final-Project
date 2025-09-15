import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navigation from "./containers/Navigation"
import Cart from "./pages/Cart"
import Dashboard from "./pages/Dashboard/"
import Market from "./pages/Market/Market"
import Footer from "./containers/Footer"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/signup/indeex"
import ProductDetails from "./pages/ProductDetails"
import ReviewPage from "./pages/leaveReview"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/market" element={<Market />}/>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile"/>
            <Route path="order"/>
            <Route path="statistics"/>
          </Route>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="logout"/>
          <Route path="/products/:id/review" element={<ReviewPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
