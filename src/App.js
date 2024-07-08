import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/Auth/LoginPage';
import ShopPage from './pages/ShopPage/ShopPage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import SupportPage from './pages/SupportPage/SupportPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import { SavedToCartProvider } from './SavedToCartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <SavedToCartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
          </Routes>
        </SavedToCartProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
