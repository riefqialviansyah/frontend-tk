import { createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const productSlice = createSlice({
  name: "product",
  initialState: { listProduct: {} },
  reducers: {
    setProduct: (state, action) => {
      state.listProduct = action.payload;
    },
  },
});

export function fetchProducts({ pageNumber, search }) {
  let url = `${baseUrl}/product/get`;

  if (pageNumber) {
    url += `?page[number]=${pageNumber}`;
  }

  if (search) {
    if (pageNumber) {
      url += `&search=${search}`;
    } else {
      url += `?search=${search}`;
    }
  }

  return async (dispatch) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setProduct(data));
    }
  };
}

export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
