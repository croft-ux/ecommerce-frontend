// frontend/src/components/FilterButtons.js
import React from 'react';

const FilterButtons = ({ onPageChange }) => {
    return (
        <div className="category-filters">
            <button onClick={() => onPageChange('all', 'Discover Our Latest Collection')}>All</button>
            <button onClick={() => onPageChange('apparel', 'Shop All Apparel')}>Apparel</button>
            <button onClick={() => onPageChange('electronics', 'Explore Electronics')}>Electronics</button>
            <button onClick={() => onPageChange('accessories', 'Accessorize Your Life')}>Accessories</button>
            <button onClick={() => onPageChange('deals', '⚡ Today\'s Hot Deals! ⚡')}>Deals</button>
        </div>
    );
};

export default FilterButtons;