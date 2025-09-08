import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";



function App() {
  return (
    <div>
      <p>
        <BrowserRouter>
        <Routes>
          <Route  path="/" element = {<Home />} />
        </Routes>
        </BrowserRouter>
      </p>
    </div>
  )
}

export default App