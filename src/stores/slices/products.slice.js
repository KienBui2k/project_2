import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const findAllProducts = createAsyncThunk(
    "findAllProducts",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'products');
        return res.data
    }
)
const filterProductByType = createAsyncThunk(
    "filterProductByType",
    async (type) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}products?name_like = ${type}`);
        return res.data
    }
)
const searchProductByName = createAsyncThunk(
    "searchProductByName",
    async (name) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}products?name_like=${name}`)
        return res.data
    }
)
const checkOut = createAsyncThunk(
    "checkOut",
    async (checkObj) => {
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + checkObj.id, checkObj.patchData)
        return res.data
    }

)
const productSlice = createSlice(
    {
        name: "product",
        initialState: {
            listProducts: [],
            searchName: []
        },
        extraReducers: (builder) => {
            builder.addCase(findAllProducts.fulfilled, (state, action) => {
                state.listProducts = [...action.payload]
            })
            builder.addCase(filterProductByType.fulfilled, (state, action) => {
                state.listProducts = [...action.payload]
            })
            builder.addCase(searchProductByName.fulfilled, (state, action) => {
                state.searchName = [...action.payload]
            })
            builder.addCase(checkOut.fulfilled, (state, action) => {
                console.log('xong roi day', action)
            })
        }

    }
)


export const productActions = {
    ...productSlice.actions,
    findAllProducts,
    filterProductByType,
    searchProductByName,
    checkOut

}
export default productSlice.reducer;