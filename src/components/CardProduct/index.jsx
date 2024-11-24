import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import imgCart from '../../assets/img/buy.png';
import config from '../../config'
import './index.css';

const CardProduct = ({ product, isLoggedIn }) => {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Start with the first color option

    // Update the main image when a color is selected
    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleProductClick = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <div className="card-product">
            <div className="main-image-container">
                <img
                    src={`${config.apiBaseUrl}/images/products/${selectedColor.image}`}
                    alt={product.name}
                    className="main-product-image"
                />
            </div>

            <div className="color-options">
                {product.colors.map((color) => (
                    <img
                        key={color._id}
                        src={`${config.apiBaseUrl}/images/products/${color.image}`}
                        alt={color.color}
                        className={`color-thumbnail ${selectedColor._id === color._id ? 'active' : ''}`}
                        onClick={() => handleColorClick(color)}
                    />
                ))}
            </div>

            <div className="product-details">
                <h3 className="product-name" onClick={handleProductClick}>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">
                    {product.currency} {selectedColor.sizes[0].price} {/* Display price of the first size as an example */}
                </p>

                <div className="size-options">
                    <label>Size: </label>
                    {selectedColor.sizes.map((size) => (
                        <button key={size._id} className="size-button">
                            {size.size}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CardProduct;
