// frontend/src/components/CheckoutModal.js
import React, { useEffect } from 'react';

const CheckoutModal = ({ isOpen, onClose }) => {
    // Automatically close the modal after 3 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 3 seconds
            
            // Clean up the timer when the component unmounts or the modal closes
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="checkout-modal">
                <h2>Thank You for Your Order!</h2>
                <p>Your order has been placed successfully.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CheckoutModal;