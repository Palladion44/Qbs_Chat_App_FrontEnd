// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";
// import rootReducer from '../src/features/auth/authSlice.reducer'

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//         immutableCheck: false
//     })
// })

// const persistor = persistStore(store)

// export { store, persistor }


import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from './features/auth/authSlice'; // Ensure this path is correct

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})

const persistor = persistStore(store);

export { store, persistor };
