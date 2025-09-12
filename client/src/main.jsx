import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // ✅ import PersistGate
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./redux/Store"; // ✅ import persistor
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
