// frontend/src/components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard'; // Corrected with a capital 'C'

const ProductGrid = ({ products, onAddToCart }) => {
    return (
        <div className="products-grid">
            {products.length > 0 ? (
                products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))
            ) : (
                <p className="no-products-found">No products match your search or filter criteria.</p>
            )}
        </div>
    );
};

export default ProductGrid;