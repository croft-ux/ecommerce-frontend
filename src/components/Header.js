// frontend/src/components/Header.js
import React, { useState } from 'react';

const Header = ({ onOpenCart, onPageChange }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Pass the search term to the onPageChange function
        onPageChange('search', `Search Results for "${searchInput}"`, searchInput);
        setSearchInput(''); // Clear the input field
    };

    return (
        <header>
            <nav className="navbar">
                <div className="logo">E-Comm</div>
                <ul className="nav-links">
                    <li><a href="#" onClick={() => onPageChange('all', 'Discover Our Latest Collection')}>Shop All</a></li>
                    <li><a href="#" onClick={() => onPageChange('new-arrivals', 'Freshly Added: New Arrivals!')}>New Arrivals</a></li>
                    <li><a href="#" onClick={() => onPageChange('best-sellers', 'Our Top Picks: Best Sellers!')}>Best Sellers</a></li>
                    <li><a href="#" onClick={() => onPageChange('deals', '⚡ Today\'s Hot Deals! ⚡')}>Deals</a></li>
                </ul>
                <div className="nav-icons">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Search products..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button type="submit" id="searchButton">Search</button>
                    </form>
                    <button className="open-cart" id="openCart" onClick={onOpenCart}>
                        <img src="images/cart.png" alt="Cart" />
                        <span id="cartCount">0</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;