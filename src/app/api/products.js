import axios from 'axios';
import config from '../../config';

export const getProduct = async (params) => {
    console.log('Params:', params);
    try {
        const product = await axios.get(`${config.apiBaseUrl}/api/products`, { params });
        if (product.data && product.data.data && product.data.data.length > 0) {
            // console.log('API Response:', product.data);
            return product.data.data;
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductDetail = async (productId) => {
    try {
        const product = await axios.get(`${config.apiBaseUrl}/api/products/${productId}`);
        if (product.data) {
            // console.log('Product Detail:', product.data);
            return product.data;
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const categories = await axios.get(`${config.apiBaseUrl}/api/categories`);
        return categories.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const getBrands = async (category) => {
    try {
        const brand = await axios.get(`${config.apiBaseUrl}/api/brand`);
        return brand.data
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
    
}