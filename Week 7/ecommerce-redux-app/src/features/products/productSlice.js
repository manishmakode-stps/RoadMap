import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../../services/api";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await fetchProductsAPI();
    return products;
  }
);

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },

    fetchProductsSuccess(state, action) {
      const products = action.payload;

      state.loading = false;

      products.forEach(product => {
        state.byId[product.id] = product;
        state.allIds.push(product.id);
      });
    },

    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products = action.payload;

        state.loading = false;

        products.forEach(product => {
          state.byId[product.id] = product;
          state.allIds.push(product.id);
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} = productSlice.actions;

export default productSlice.reducer;

export const selectProducts = (state) => state.products;

export const selectAllProducts = (state) =>
  state.products.allIds.map(id => state.products.byId[id]);