import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ProductCard = ({ product }) => {
  const formattedPrice = parseFloat(product.price).toFixed(2);
  const formattedDiscountedPrice = product.discountedPrice ? parseFloat(product.discountedPrice).toFixed(2) : null;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={`/images/${product.image.split('/').pop().replace('.jpg', '.jpeg')}`} alt={product.name} className="product-image" />
      </Link>
      <div className="product-details">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category}</p>
        <div className="price-container">
          {product.discountedPrice ? (
            <>
              <p className="original-price">${formattedPrice}</p>
              <p className="discounted-price">${formattedDiscountedPrice}</p>
            </>
          ) : (
            <p className="price">${formattedPrice}</p>
          )}
        </div>
        {product.isNewArrival && <span className="badge new-arrival">New Arrival</span>}
        {product.isBestSeller && <span className="badge best-seller">Best Seller</span>}
      </div>
    </div>
  );
};

export default ProductCard;