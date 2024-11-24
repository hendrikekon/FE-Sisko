import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../app/features/Product/actions';
// import { addToCart } from '../../app/features/Cart/actions'; // Ensure this action exists
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../config';
import imgCart from '../../assets/img/cart.png'; // Ensure the cart icon path is correct
import { addItem } from '../../app/features/Carts/actions';

const DetailProduct = ({productsId, isLoggedIn}) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const productDetail = useSelector(state => state.product.productDetail);
    const status = useSelector(state => state.product.status);
    const error = useSelector(state => state.product.error);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    // const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        dispatch(fetchProductDetail(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (productDetail && productDetail.colors && productDetail.colors.length > 0) {
            setSelectedColor(productDetail.colors[0]);
            setSelectedSize(productDetail.colors[0].sizes[0]); // Set default size if available
        }
    }, [productDetail]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    const handleColorClick = (color) => {
        setSelectedColor(color);
        setSelectedSize(color.sizes[0]); // Reset to the first size of the selected color
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };


    // const HandleAddToCart = () => {
    //     if(!isLoggedIn) {
    //         navigate('/login');
    //     }else{
    //         dispatch(addItem(product));
    //     }
        
    // };

    const handleAddToCart = () => {
        // console.log('handleAddToCart triggered');
        if(!isLoggedIn) {
            navigate('/login');
        }else{
            if (selectedColor && selectedSize) {
                const cartItem = {
                    productId: productDetail._id,
                    colorId: selectedColor._id,
                    sizeId: selectedSize._id,
                    // quantity: quantity,
                    name: productDetail.name,
                    color: selectedColor.color,
                    size: selectedSize.size,
                    price: selectedSize.price,
                    stock: selectedSize.stock,
                    image_url: selectedColor.image,
                };
                dispatch(addItem(cartItem));
                // console.log(`productid: ${productDetail._id}`);
                // console.log(`name: ${productDetail.name}`);
                // console.log(`color: ${selectedColor.color}`);
                // console.log(`size: ${selectedSize.size}`);
                // console.log(`quantity: ${quantity}`);
                // console.log(`price: ${selectedSize.price}`);
                // console.log(`stock: ${selectedSize.stock}`);
                // console.log(`image_url: ${selectedColor.image}`);
            } else {
                console.log('Selected color or size is missing');
            }
        }
    };
    

    return (
        <div className='detail-product-container'>
            <div className='detail-product-list'>
                {/* Optional space for margin or advertising */}
            </div>
                {productDetail ? (
                    <>
                        <div className='detail-product-list'>
                            <div className='detail-product-content1'>
                                <div className="main-image-detail">
                                    <img
                                        src={`${config.apiBaseUrl}/images/products/${selectedColor?.image}`}
                                        alt={productDetail.name}
                                        className="main-detailproduct-image"
                                    />
                                </div>
                            </div>
                            <div className='detail-product-content2'>
                                <h1>{productDetail.name}</h1>
                                <p>{productDetail.description}</p>
                                
                            </div>
                            <div className='detail-product-content3'>
                                <div className='color-detail-product'>
                                <p>Harga: {selectedSize ? `Rp.${selectedSize.price}` : 'Select a size'}</p>
                                <p>Stock: {selectedSize ? `${selectedSize.stock}` : 'Select a size'}</p>
                                    <div className="detail-color-options">
                                        {productDetail.colors.map((color) => (
                                            <img
                                                key={color._id}
                                                src={`${config.apiBaseUrl}/images/products/${color.image}`}
                                                alt={color.color}
                                                className={`detailcolor-thumbnail ${selectedColor?._id === color._id ? 'active' : ''}`}
                                                onClick={() => handleColorClick(color)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="detail-size-options">
                                    {selectedColor?.sizes.map((size) => (
                                        <button
                                            key={size.size}
                                            className={`detail-size-button ${selectedSize?.size === size.size ? 'active' : ''}`}
                                            onClick={() => handleSizeChange(size)}
                                        >
                                            {size.size}
                                        </button>
                                    ))}
                                </div>

                                <button className="add-to-cart" onClick={handleAddToCart}>
                                    <img src={imgCart} alt="Add to Cart" className="img-cart" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No Product Detail Available</p>
                )}
                
        </div>
    );
};

export default DetailProduct;
