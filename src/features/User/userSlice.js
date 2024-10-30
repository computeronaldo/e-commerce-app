import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://e-commerce-app-backend-nu.vercel.app';
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        userInfo,
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username },
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async ({ username, productId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/wishlist`,
        { username, productId },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async ({ username, productId }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/wishlist`,
        {
          data: { username, productId },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const addNewAddress = createAsyncThunk(
  "user/addNewAddress",
  async ({ username, newAddress }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/address`,
        { username, address: newAddress },
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const editAddress = createAsyncThunk(
  "user/editAddress",
  async ({ username, addressId, newAddress }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/address/${addressId}`,
        { username, address: newAddress, addressId },
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async ({ username, addressId }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/address/${addressId}`,
        { data: { username } },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const placeOrder = createAsyncThunk(
  "user/placeOrder",
  async ({ orderInfo }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order`,
        orderInfo,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const userOrders = createAsyncThunk(
  "user/userOrders",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order/${userId}`,
      );
      return response.data;
    } catch (error) {
      if(!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: "idle",
    error: null,
    addressMutationResult: null,
    selectedAddress: null,
    orderStatus: null,
    orders: null,
  },
  reducers: {
    registerFormErrorReset: (state, _action) => {
      state.error = null;
    },
    loginFormErrorReset: (state, _action) => {
      state.error = null;
    },
    resetAddressError: (state, _action) => {
      state.error = null;
    },
    resetEditAddressForm: (state, _action) => {
      state.addressMutationResult = "idle";
    },
    selectAddress: (state, action) => {
      if (action.payload.checked) {
        state.selectedAddress = null;
      } else {
        state.selectedAddress = action.payload.addressId;
      }
    },
    resetOrderStatus: (state, _action) => {
      state.orderStatus = null;
    },
    logoutUser: (state, _action) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.loading = "idle";
    });
    builder.addCase(registerUser.pending, (state, _action) => {
      state.user = null;
      state.error = null;
      state.loading = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.loading = "idle";
    });
    builder.addCase(loginUser.pending, (state, _action) => {
      state.user = null;
      state.error = null;
      state.loading = "loading";
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
    });
    builder.addCase(addToWishlist.pending, (state, _action) => {
      state.error = null;
      state.loading = "loading";
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
    });
    builder.addCase(removeFromWishlist.pending, (state, _action) => {
      state.error = null;
      state.loading = "loading";
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
      state.addressMutationResult = "success";
    });
    builder.addCase(addNewAddress.pending, (state, _action) => {
      state.loading = "loading";
      state.error = null;
      state.addressMutationResult = "pending";
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
      state.addressMutationResult = "failed";
    });
    builder.addCase(editAddress.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
      state.addressMutationResult = "success";
    });
    builder.addCase(editAddress.pending, (state, _action) => {
      state.loading = "loading";
      state.error = null;
      state.addressMutationResult = "pending";
    });
    builder.addCase(editAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
      state.addressMutationResult = "failed";
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
    });
    builder.addCase(deleteAddress.pending, (state, _action) => {
      state.error = null;
      state.loading = "loading";
    });
    builder.addCase(placeOrder.fulfilled, (state, _action) => {
      state.orderStatus = "placed";
    });
    builder.addCase(placeOrder.pending, (state, _action) => {
      state.orderStatus = "placing";
    });
    builder.addCase(placeOrder.rejected, (state, _action) => {
      state.orderStatus = "rejected";
    });
    builder.addCase(userOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.loading = "idle";
    });
    builder.addCase(userOrders.pending, (state, _action) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(userOrders.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  },
});

export const {
  registerFormErrorReset,
  loginFormErrorReset,
  resetAddressError,
  resetEditAddressForm,
  selectAddress,
  resetOrderStatus,
  logoutUser
} = userSlice.actions;
export default userSlice;
