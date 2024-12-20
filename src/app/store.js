import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./middleware/authMiddleware";
import productReducer from './features/Product/reducer';
import authReducer from './features/Auth/reducer';
import cartReducer from './features/Carts/reducer';
import addressReducer from "./features/Address/reducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;
