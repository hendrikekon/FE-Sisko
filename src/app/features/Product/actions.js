import {
    START_FETCHING_PRODUCT,
    ERROR_FETCHING_PRODUCT,
    SUCCESS_FETCHING_PRODUCT,
    START_FETCHING_PRODUCT_DETAIL,
    ERROR_FETCHING_PRODUCT_DETAIL,
    SUCCESS_FETCHING_PRODUCT_DETAIL,
    SET_PAGE,
    SET_BRANDS,
    SET_CATEGORY,
    SET_KEYWORD,
    NEXT_PAGE,
    PREV_PAGE,
    NO_PRODUCTS_FOUND,
} from './constants';
import { getProduct, getProductDetail } from '../../api/products';
import debounce from 'debounce-promise';

const debouncedFetchProduct = debounce(getProduct, 1000);

export const startFetchingProduct = () => ({
    type: START_FETCHING_PRODUCT,
});

export const successFetchingProduct = (products) => ({
    type: SUCCESS_FETCHING_PRODUCT,
    payload: products,
});

export const errorFetchingProduct = (error) => ({
    type: ERROR_FETCHING_PRODUCT,
    payload: error.message,
});

export const fetchProduct = (selectedCategory, selectedBrand) => {
    return async (dispatch, getState) => {
        dispatch(startFetchingProduct());

        let { perPage, currentPage, category, brands, keyword } = getState().product;

        category = selectedCategory || category;
        brands = selectedBrand || brands;
        const params = {
            limit: perPage,
            skip: (currentPage - 1) * perPage,
            brands: brands || '',
            category: category || '',
            // brands: brands ? encodeURIComponent(brands) : '',
            // category: category ? encodeURIComponent(category) : '',
            q: keyword || '',
        }

        console.log('Fetching products with params:', params);

        try {
            const response = await debouncedFetchProduct(params);
            if (response) {
                dispatch(successFetchingProduct(response));
            } else {
                dispatch({ type: NO_PRODUCTS_FOUND });
                // throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            dispatch(errorFetchingProduct(error));
        }
    };
};

export const startFetchingProductDetail = () => ({
    type: START_FETCHING_PRODUCT_DETAIL,
});

export const successFetchingProductDetail = (product) => ({
    type: SUCCESS_FETCHING_PRODUCT_DETAIL,
    payload: product,
});

export const errorFetchingProductDetail = (error) => ({
    type: ERROR_FETCHING_PRODUCT_DETAIL,
    payload: error.message,
});

export const fetchProductDetail = (productId) => {
    return async (dispatch) => {
        dispatch(startFetchingProductDetail());
        try {
            const response = await getProductDetail(productId);
            dispatch(successFetchingProductDetail(response));
        } catch (error) {
            console.error('Error in fetchProductDetail:', error);
            dispatch(errorFetchingProductDetail(error));
        }
    };
};

export const setCategory = (category) => {
    return (dispatch) => {
        dispatch({ type: SET_CATEGORY, payload: category });
        dispatch(fetchProduct(category));
    };
};

export const setBrand = (brand) => {
    return (dispatch) => {
        dispatch({ type: SET_BRANDS, payload: brand });
        dispatch(fetchProduct(brand));
    };
};
// export const setBrand = (selectedBrand) => ({
//     type: 'SET_BRAND',
//     payload: selectedBrand,
// });


export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: keyword,
});

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page,
});

export const nextPage = () => {
    return (dispatch, getState) => {
        dispatch({ type: NEXT_PAGE });
        const { category } = getState().product; 
        dispatch(fetchProduct(category));
    };
};

export const prevPage = () => {
    return (dispatch, getState) => {
        dispatch({ type: PREV_PAGE });
        const { category } = getState().product;
        dispatch(fetchProduct(category));
    };
};