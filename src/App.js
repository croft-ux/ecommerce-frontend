import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import ProductDetailPage from './components/ProductDetailPage';
import './App.css';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const processedProducts = data.map(product => ({
          ...product,
          discount: product.discount === 1,
          isNewArrival: product.isNewArrival === 1,
          isBestSeller: product.isBestSeller === 1
        }));
        setAllProducts(processedProducts);
        setProductsToDisplay(processedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Could not fetch products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setSearchTerm(''); // Clear search term when filtering
    setIsCartVisible(false);
    if (category === 'All') {
      setProductsToDisplay(allProducts);
    } else if (category === 'Deals') {
      const deals = allProducts.filter(product => product.discount);
      setProductsToDisplay(deals);
    } else {
      const filtered = allProducts.filter(product => product.category === category.toLowerCase());
      setProductsToDisplay(filtered);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsCartVisible(false);
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
    setProductsToDisplay(filteredProducts);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  
  const incrementQuantity = (productId) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decrementQuantity = (productId) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.quantity * (item.discountedPrice || item.price), 0);
  };

  const handleCheckout = () => {
    // This is a placeholder for a real checkout process.
    alert("Proceeding to checkout! (This is a placeholder)");
    setCart([]);
    setIsCartVisible(false);
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 7.50;
  const total = subtotal + tax + shipping;

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: Could not load products. Please ensure the backend server is running.</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>E-commerce Store</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="cart-container">
          <button className="cart-button" onClick={toggleCart}>
            <FaShoppingCart />
            Cart ({totalItemsInCart})
          </button>
        </div>
      </header>
      
      <div className="category-buttons-container">
        <button onClick={() => navigate('/')}>Home</button>
        <button 
          onClick={() => filterByCategory('All')} 
          className={activeCategory === 'All' ? 'active' : ''}
        >
          All Products
        </button>
        <button 
          onClick={() => filterByCategory('Deals')}
          className={activeCategory === 'Deals' ? 'active' : ''}
        >
          Deals
        </button>
        <button 
          onClick={() => filterByCategory('Apparel')}
          className={activeCategory === 'Apparel' ? 'active' : ''}
        >
          Apparel
        </button>
        <button 
          onClick={() => filterByCategory('Electronics')}
          className={activeCategory === 'Electronics' ? 'active' : ''}
        >
          Electronics
        </button>
        <button 
          onClick={() => filterByCategory('Accessories')}
          className={activeCategory === 'Accessories' ? 'active' : ''}
        >
          Accessories
        </button>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="product-list">
              {productsToDisplay.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          } />
          <Route path="/product/:id" element={<ProductDetailPage allProducts={allProducts} addToCart={addToCart} />} />
        </Routes>
        

        {isCartVisible && (
          <div className="cart-popup">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={toggleCart} className="close-cart-button">&times;</button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul className="cart-item-list">
                  {cart.map(item => (
                    <li key={item.id}>
                      <img src={`/images/${item.image.split('/').pop().replace('.jpg', '.jpeg')}`} alt={item.name} />
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">${parseFloat(item.discountedPrice || item.price).toFixed(2)}</p>
                        <div className="quantity-controls">
                          <button className="quantity-button" onClick={() => decrementQuantity(item.id)}>-</button>
                          <span className="quantity">{item.quantity}</span>
                          <button className="quantity-button" onClick={() => incrementQuantity(item.id)}>+</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="cart-summary">
                  <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                  <p>Tax (8%): <span>${tax.toFixed(2)}</span></p>
                  <p>Shipping: <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span></p>
                  <div className="cart-total">
                    <h3>Total: <span>${total.toFixed(2)}</span></h3>
                  </div>
                  <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;