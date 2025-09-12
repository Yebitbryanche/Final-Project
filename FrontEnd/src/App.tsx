import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navigation from "./containers/Navigation"
import Cart from "./pages/Cart"
import Market from "./pages/Market/Market"
import Footer from "./containers/Footer"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/signup/indeex"
import Profile from "./pages/Dashboard/Profile"
import Statistics from "./pages/Dashboard/Statistics"
import Dashboard from "./pages/Dashboard"
import LogoutPage from "./pages/Dashboard/LogoutPage"



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/market" element={<Market />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="profile" element={<Profile />}/>
          
            <Route path="statistics" element={<Statistics />}/>
            
             <Route path="logout" element={<LogoutPage/>}/>

         
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="logout"/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
