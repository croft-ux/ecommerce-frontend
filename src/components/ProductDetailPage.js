import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const ProductDetailPage = ({ allProducts, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, allProducts, navigate]);

  if (!product) {
    return <div className="loading">Product not found...</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1); // Reset quantity after adding
    alert(`${product.name} added to cart!`);
  };

  const formattedPrice = parseFloat(product.price).toFixed(2);
  const formattedDiscountedPrice = product.discountedPrice ? parseFloat(product.discountedPrice).toFixed(2) : null;

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">&larr; Back to Products</button>
      <div className="detail-container">
        <div className="image-column">
          <img 
            src={`/images/${product.image.split('/').pop().replace('.jpg', '.jpeg')}`} 
            alt={product.name} 
            className="product-detail-image" 
          />
        </div>
        <div className="info-column">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-category">Category: {product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <div className="price-container">
            {product.discountedPrice ? (
              <>
                <p className="original-price">${formattedPrice}</p>
                <p className="discounted-price-large">${formattedDiscountedPrice}</p>
              </>
            ) : (
              <p className="price-large">${formattedPrice}</p>
            )}
          </div>
          {product.isNewArrival && <span className="badge new-arrival">New Arrival</span>}
          {product.isBestSeller && <span className="badge best-seller">Best Seller</span>}
          
          <div className="quantity-add-to-cart">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;