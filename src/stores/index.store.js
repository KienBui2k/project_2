
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/counter.slice';
import productActions from "./slices/products.slice";
import userLoginActions from "./slices/userLogin.slice";
import cartsReducer from "./slices/cart.slice";

const store = configureStore({
    reducer: {
        counterStore: counterReducer,
        productStore: productActions,
        userLoginStore: userLoginActions,
        cartsLocalStore: cartsReducer
    }
});

export default store;
