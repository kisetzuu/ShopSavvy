import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext'; // Adjusted path based on your structure
import { auth, db, database } from '../../services/FirebaseConfig'; // Adjusted path based on your structure
import { doc, getDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { ref, get, child, set } from 'firebase/database';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, setCartItems, removeFromCart, emptyCart, balance, setBalance } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndWishlistItems = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const dbRef = ref(database);

          // Fetch cart items
          const cartSnapshot = await get(child(dbRef, `carts/${user.uid}`));
          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.val().items || []);
          } else {
            setCartItems([]);
          }

          // Fetch wishlist items
          const wishlistSnapshot = await get(child(dbRef, `wishlists/${user.uid}`));
          if (wishlistSnapshot.exists()) {
            setWishlistItems(wishlistSnapshot.val().items || []);
          } else {
            setWishlistItems([]);
          }
        } catch (error) {
          console.error("Error fetching items from Realtime Database:", error);
        }
      }
    };

    fetchCartAndWishlistItems();
  }, [setCartItems]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const cost = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
      setTotalCost(cost);
    };

    calculateTotalCost();
  }, [cartItems]);

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (user) {
      const newBalance = balance - totalCost;

      if (newBalance < 0) {
        alert('Insufficient balance for checkout.');
        return;
      }

      try {
        const balanceRef = ref(database, `balances/${user.uid}`);
        const cartRef = ref(database, `carts/${user.uid}`);

        // Check if the balance node exists
        const balanceSnapshot = await get(balanceRef);
        if (balanceSnapshot.exists()) {
          await set(balanceRef, newBalance);
        } else {
          // Create balance node if it doesn't exist
          await set(balanceRef, newBalance);
        }

        // Deduct stock quantities from Firestore
        const batch = writeBatch(db);
        for (const item of cartItems) {
          if (!item.id) {
            console.error("Item does not have an id:", item);
            continue;
          }

          const itemId = item.id.toString();
          console.log("Processing item with ID:", itemId);

          const productRef = doc(db, 'products', itemId);
          const productDoc = await getDoc(productRef);

          if (productDoc.exists()) {
            const productData = productDoc.data();
            const newStock = productData.stock - (item.quantity || 1);

            if (newStock < 0) {
              alert(`Not enough stock for ${item.name}. Available stock: ${productData.stock}`);
              return;
            }

            batch.update(productRef, { stock: newStock });
          } else {
            console.error(`Product ${itemId} does not exist.`);
            return;
          }
        }

        await batch.commit();

        // Clear the cart
        await set(cartRef, { items: [] });

        setBalance(newBalance);
        setCartItems([]);
        navigate('/receipt', { state: { cartItems, totalCost, balance: newBalance } });
      } catch (error) {
        console.error("Error during checkout:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleRemoveFromWishlist = async (id) => {
    const user = auth.currentUser;
    if (user) {
      const updatedWishlist = wishlistItems.filter(item => item.id !== id);

      try {
        const wishlistRef = ref(database, `wishlists/${user.uid}`);
        await set(wishlistRef, { items: updatedWishlist });
        setWishlistItems(updatedWishlist);
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleMoveToCart = async (item) => {
    const user = auth.currentUser;
    if (user) {
      // Remove from wishlist
      const updatedWishlist = wishlistItems.filter(wishlistItem => wishlistItem.id !== item.id);
      try {
        const wishlistRef = ref(database, `wishlists/${user.uid}`);
        await set(wishlistRef, { items: updatedWishlist });
        setWishlistItems(updatedWishlist);
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
        alert(`Error: ${error.message}`);
        return;
      }

      // Add to cart
      const updatedCart = [...cartItems, item];
      try {
        const cartRef = ref(database, `carts/${user.uid}`);
        await set(cartRef, { items: updatedCart });
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="cartpage-container">
      <div className="cart-header">
      </div>
      <div className="cart-wishlist-container">
        <div className="cart-section">
          <h3>Shopping Cart</h3>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity || 1}</p>
                  <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="cart-total">
                <p>Total Cost: ${totalCost}</p>
                <p>Balance: ${balance}</p>
              </div>
              <div className="cart-actions">
                <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
              </div>
            </>
          )}
          {cartItems.length === 0 && (
            <div className="empty-cart-message">
              <p>Your cart is currently empty.</p>
              <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
          )}
        </div>

        <div className="wishlist-section">
          <h3>Wishlist</h3>
          <div className="wishlist-items">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                <div className="wishlist-item-details">
                  <p className="wishlist-item-name">{item.name}</p>
                  <p className="wishlist-item-price">${item.price}</p>
                  <div className="wishlist-item-actions">
                    <button className="move-to-cart-button" onClick={() => handleMoveToCart(item)}>Move to Cart</button>
                    <button className="remove-item-button" onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {wishlistItems.length === 0 && (
            <div className="empty-wishlist-message">
              <p>Your wishlist is currently empty.</p>
              <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
