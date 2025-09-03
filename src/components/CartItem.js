// frontend/src/components/CartItem.js
import React from 'react';

const CartItem = ({ item, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity }) => {
    const itemPrice = item.discount ? item.discountedPrice : item.price;
    
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="item-price">${itemPrice.toFixed(2)}</p>
                <div className="cart-item-quantity">
                    <button className="decrease-quantity" onClick={() => onDecreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="increase-quantity" onClick={() => onIncreaseQuantity(item.id)}>+</button>
                </div>
            </div>
            <button className="remove-item" onClick={() => onRemoveItem(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem;