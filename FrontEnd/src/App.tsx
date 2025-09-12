import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Market from "./pages/Market/Market";
// import Developers from "./pages/Portfolio/Developers";
import Dashboard from "./pages/dashboard/Dasboard"
import Order from "./pages/dashboard/Order";
import Statistics from "./pages/dashboard/Statistics";
import Profile from "./pages/dashboard/Profile";
import LogoutPage from "./pages/dashboard/LogoutPage";



function App() {
  return (
    <div>
      <p>
        <BrowserRouter>
        <Routes>
          <Route  path="/" element = {<Dashboard />} />
          <Route  path="/Statistics" element = {<Statistics/>} />
          <Route  path="/Profile" element = {<Profile/>} />
          <Route  path="/logout" element = {<LogoutPage />} />

        </Routes>
        </BrowserRouter>
      </p>
    </div>
  )
}

export default App