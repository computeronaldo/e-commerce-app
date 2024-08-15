import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-app-backend-nu.vercel.app/categories",
      );

      console.log(response);
      if (response.status != 200) {
        throw new Error(response);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-app-backend-nu.vercel.app/products",
      );

      if (response.status != 200) {
        throw new Error(response);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
);

const fetchProductsByQuery = createAsyncThunk(
  "/products/fetchProductsByQuery",
  async (searchQuery) => {
    try {
      if (searchQuery === "") {
        return [];
      }

      const response = await axios.get(
        `https://e-commerce-app-backend-nu.vercel.app/search?title=${searchQuery}`,
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
);

let timer;
const debounced = (searchQuery, dispatch) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    dispatch(fetchProductsByQuery(searchQuery));
  }, 400);
};

export const debouncedFetchProducts = (searchQuery) => (dispatch) =>
  debounced(searchQuery, dispatch);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsLoading: "idle",
    productsError: null,
    searchedProducts: [],
    searchedProductsLoading: "idle",
    searchedProductsError: null,
    categories: [],
    categoriesLoading: "idle",
    categoriesError: null,
  },
  reducers: {
    emptySearchQuery: (state, _action) => {
      state.searchedProducts = [];
      state.searchedProductsLoading = "idle";
      state.searchedProductsError = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.categoriesLoading = "idle";
      state.categoriesError = null;
    });
    builder.addCase(fetchCategories.pending, (state, _action) => {
      state.categories = [];
      state.categoriesLoading = "loading";
      state.categoriesError = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = [];
      state.categoriesLoading = "idle";
      state.categoriesError = action.error.message;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.productsLoading = "idle";
      state.productsError = null;
    });
    builder.addCase(fetchProducts.pending, (state, _action) => {
      state.products = [];
      state.productsLoading = "loading";
      state.productsError = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products = [];
      state.productsLoading = "idle";
      state.productsError = action.error.message;
    });
    builder.addCase(fetchProductsByQuery.fulfilled, (state, action) => {
      state.searchedProducts =
        action.payload.length === 0 ? [] : action.payload.data;
      state.searchedProductsLoading = "idle";
      state.searchedProductsError = null;
    });
    builder.addCase(fetchProductsByQuery.pending, (state, _action) => {
      state.searchedProducts = [];
      state.searchedProductsLoading = "loading";
      state.searchedProductsError = null;
    });
    builder.addCase(fetchProductsByQuery.rejected, (state, action) => {
      state.searchedProducts = [];
      state.searchedProductsLoading = "idle";
      state.searchedProductsError = action.error.message;
    });
  },
});
export const { emptySearchQuery } = productsSlice.actions;
export default productsSlice;
