import React, { useEffect, useRef, useState } from "react";
import './index.css';
import { useDispatch, } from "react-redux";
import { getBrands, getCategories } from "../../app/api/products";
import { setBrand, setKeyword } from "../../app/features/Product/actions";

const Shop = ({setSearchKeyword}) => {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const accountRef = useRef();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await getBrands();
                setBrands(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBrands();
    }, []);

    const handleBrandChange = (brand) => {
        dispatch(setKeyword(''));
        setSearchKeyword('');
        const selectedBrand = brand; ;
        console.log(selectedBrand);
        dispatch(setBrand(selectedBrand));
        setShowPopup(false);
    };

    return (
        <div ref={accountRef} className="dropdown linkMenu">
            <button onClick={() => setShowPopup(!showPopup)} className="dropdown-toggle">
                Shop
            </button>
            {showPopup && (
                <ul className="dropdown-menu show">
                    {brands.map((brand) => (
                        <li key={brand._id}>
                            <button
                                onClick={() => handleBrandChange(brand.name)}
                                className="link-brand"
                            >
                                {brand.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Shop;

