import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/Auth/LoginPage';
import ShopPage from './pages/ShopPage/ShopPage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import SupportPage from './pages/SupportPage/SupportPage';
import ReceiptPage from './pages/Receipt/ReceiptPage';
import AboutPage from './pages/AboutPage/AboutPage';
import AccountPage from './pages/Account/AccountPage'; // Import AccountPage
import ProductListing from './pages/ProductListing/ProductListing'; // Import ProductListing
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
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/account" element={<AccountPage />} /> {/* Add AccountPage route */}
            <Route path="/product-listing" element={<ProductListing />} /> {/* Add ProductListing route */}
          </Routes>
        </SavedToCartProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
