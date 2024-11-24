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
    NEXT_PAGE,
    PREV_PAGE,
    SET_KEYWORD,
    NO_PRODUCTS_FOUND,
} from './constants';

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: 'failed'
};

const initialState = {
    data: [],
    page: 1,
    brands: '',
    category: '',
    currentPage: 1,
    totalItems: 0,
    perPage: 8,
    keyword: '',
    productDetail: null,
    status: statusList.idle,
    noProductsFound: false,
};


export default function productReducer(state = initialState, { type, payload }) {
    switch (type) {
        case START_FETCHING_PRODUCT:
            return { ...state, status: statusList.process };
        // case SUCCESS_FETCHING_PRODUCT:
        //     return { ...state, status: statusList.success, data: payload };
        case SUCCESS_FETCHING_PRODUCT:
            return {
                ...state,
                status: statusList.success,
                data: payload,
                totalItems: state.totalItems || 0,
                currentPage: state.currentPage || 1,
                perPage: state.perPage || state.perPage,
                noProductsFound: false,
            };
        case ERROR_FETCHING_PRODUCT:
            return { ...state, status: statusList.error, noProductsFound: true, };
        case NO_PRODUCTS_FOUND: 
            return { ...state, products: [], noProductsFound: true, };
        case START_FETCHING_PRODUCT_DETAIL:
            return { ...state, status: statusList.loading };
        case SUCCESS_FETCHING_PRODUCT_DETAIL:
            return { ...state, status: statusList.succeeded, productDetail: payload };
        case ERROR_FETCHING_PRODUCT_DETAIL:
            return { ...state, status: statusList.failed, error: payload };
        case SET_KEYWORD:
            return {...state, keyword: payload};
        case SET_PAGE:
            return { ...state, page: payload };
        case NEXT_PAGE:
            return {...state, currentPage: state.currentPage + 1};
        case PREV_PAGE:
            return {...state, currentPage: state.currentPage - 1};
        case SET_BRANDS:
            return { ...state, brands: payload };
        case SET_CATEGORY:
            return { ...state, category: payload };
        default:
            return state;
    }
}

