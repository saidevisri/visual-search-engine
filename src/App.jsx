import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ProductDetails from "./Components/ProductDetails";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    
    </Router>
  );
}

export default App;
