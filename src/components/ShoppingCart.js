// frontend/src/components/ShoppingCart.js
import React from 'react';
import CartItem from './CartItem'; // We'll build this next

const ShoppingCart = ({ cart, isOpen, onCloseCart, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity, onCheckout }) => {
    // Calculate the total price of all items in the cart
    const cartTotal = cart.reduce((total, item) => {
        const price = item.discountedPrice !== undefined ? item.discountedPrice : item.price;
        return total + price * item.quantity;
    }, 0);

    return (
        <div className={`shopping-cart ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button className="close-cart-btn" onClick={onCloseCart}>&times;</button>
            </div>
            <div className="cart-items" id="cartItems">
                {cart.length === 0 ? (
                    <p className="empty-cart-message">Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemoveItem={onRemoveItem}
                            onIncreaseQuantity={onIncreaseQuantity}
                            onDecreaseQuantity={onDecreaseQuantity}
                        />
                    ))
                )}
            </div>
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="checkout-button" onClick={onCheckout} disabled={cart.length === 0}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;