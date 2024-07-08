import React from 'react';
import './App.css';
import Header from './components/Header/Header';
<<<<<<< HEAD
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import RegistrationPage from './pages/RegistrationPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
=======
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/Auth/LoginPage';
import ShopPage from './pages/ShopPage/ShopPage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import SupportPage from './pages/SupportPage/SupportPage';
import ReceiptPage from './pages/Receipt/ReceiptPage';
import AboutPage from './pages/AboutPage/AboutPage';
>>>>>>> e112336d44dc47018030b285b32e50a6a25934a1
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import { SavedToCartProvider } from './SavedToCartContext';

function App() {
  return (
    <Router>
      <CartProvider>
<<<<<<< HEAD
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
=======
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
            <Route path="/receipt" element={<ReceiptPage />} />
          </Routes>
        </SavedToCartProvider>
>>>>>>> e112336d44dc47018030b285b32e50a6a25934a1
      </CartProvider>
    </Router>
  );
}

export default App;
