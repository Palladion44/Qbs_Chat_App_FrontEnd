// // //index.js
// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import "./index.css";
// // import App from "./App";
// // import reportWebVitals from "./reportWebVitals";

// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider>
//     <App />
//   </Provider>
// );
// // src/index.js

// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import { Provider } from 'react-redux';
// // import store from './features/store';
// // import App from './App'; // Ensure this import path is correct

// // ReactDOM.render(
// //   <Provider store={store}>
// //     <App />
// //   </Provider>,
// //   document.getElementById('root')
// // );
import React from "react";
import { Provider } from "react-redux";
import { store ,persistor} from "./app/store";
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>,
);
