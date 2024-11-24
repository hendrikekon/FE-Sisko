import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Address, Cart, Checkout, DetailProduct, Home, Invoices, Login, Register, Order } from './pages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<Register />} />
            <Route path='/cart' element={<Cart setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path='/address' element={<Address/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/invoices' element={<Invoices/>}/>
            <Route path='/order' element={<Order/>}/>
            {/* <Route path="/cart" element={<Cart />}/> */}
            <Route path="/product/:productId" element={<DetailProduct isLoggedIn={isLoggedIn}/>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;