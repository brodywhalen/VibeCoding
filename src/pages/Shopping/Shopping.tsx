import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Filter } from '../../types/shopping';
import { products as initialProducts } from './data';
import './Shopping.css';

export const Shopping = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<Filter>({
    category: 'all',
    size: 'all',
    color: 'all',
  });

  useEffect(() => {
    let filtered = [...initialProducts];

    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.size !== 'all') {
      filtered = filtered.filter(product => product.sizes.includes(filters.size));
    }
    if (filters.color !== 'all') {
      filtered = filtered.filter(product => product.colors.includes(filters.color));
    }

    setProducts(filtered);
  }, [filters]);

  const handleFilterChange = (filterType: keyof Filter, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleProductClick = (productId: string) => {
    navigate(`/shopping/${productId}`);
  };

  return (
    <div className="shopping-container">
      <aside className="filters">
        <div className="filter-section">
          <h3>Category</h3>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="dresses">Dresses</option>
            <option value="jackets">Jackets</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Size</h3>
          <select
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
          >
            <option value="all">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Color</h3>
          <select
            value={filters.color}
            onChange={(e) => handleFilterChange('color', e.target.value)}
          >
            <option value="all">All Colors</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
      </aside>

      <main className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleProductClick(product.id);
              }
            }}
          >
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="description">{product.description}</p>
              <div className="product-meta">
                <div className="sizes">
                  Sizes: {product.sizes.join(', ')}
                </div>
                <div className="colors">
                  Colors: {product.colors.join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}; 