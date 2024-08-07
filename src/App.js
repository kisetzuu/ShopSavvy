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
import AccountPage from './pages/AccountPage/AccountPage';
import ProductListing from './pages/ProductListing/ProductListing';
import UpdateStock from './components/UpdateStock';
import UserListings from './pages/User Listings/UserListings'; 
import PaymentPortal from './pages/Payment/PaymentPortal';
import ContactPage from './pages/ContactPage/ContactPage';
import EditProductPage from './pages/EditProductPage/EditProductPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import { AuthProvider, ProfileProvider, CartProvider, ProfileVerificationProvider } from './services/Contexts';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProfileVerificationProvider>
        <CartProvider>
          <ProfileProvider>
            <Navbar/>
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
                <Route path="account/*" element={<AccountPage />} />
                <Route path="/product-listing" element={<ProductListing />} />
                <Route path="/user-listings" element={<UserListings />} /> 
                <Route path="/update-stock" element={<UpdateStock />} />
                <Route path="/payment-portal" element={<PaymentPortal />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/edit-product/:productId" element={<EditProductPage />} />
              </Routes>
          </ProfileProvider>
          </CartProvider>
        </ProfileVerificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
