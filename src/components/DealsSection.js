// frontend/src/components/DealsSection.js
import React from 'react';
import ProductCard from './ProductCard';

const DealsSection = ({ products, onAddToCart }) => {
    return (
        <div className="products-grid deals-grid">
            {products.length > 0 ? (
                products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))
            ) : (
                <p className="no-products-found">No deals found at the moment. Check back later!</p>
            )}
        </div>
    );
};

export default DealsSection;