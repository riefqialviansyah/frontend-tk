import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { userSlicer } from "./userSlice";
import { loadState, saveState } from "../helpers/localStorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userSlicer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
