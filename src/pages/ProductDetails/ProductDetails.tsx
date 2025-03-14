import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../Shopping/data';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="error">Product not found</div>
        <button className="back-button" onClick={() => navigate('/shopping')}>
          Back to Shopping
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // TODO: Implement cart functionality
    alert(`Added ${product.name} (${selectedSize}) to cart`);
  };

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate('/shopping')}>
        ← Back to Shopping
      </button>
      
      <div className="product-details">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          
          <div className="description-section">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          
          <div className="size-section">
            <h2>Select Size</h2>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="color-section">
            <h2>Available Colors</h2>
            <div className="color-options">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </div>
          </div>
          
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}; 