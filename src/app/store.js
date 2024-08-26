import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../features/auth/authSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root", // key for localStorage
  storage, // storage method (localStorage in this case)
};

// Wrap your authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure your store with the persisted reducer
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

// Create the persistor to persist the store
export const persistor = persistStore(store);
