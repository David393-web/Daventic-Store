import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // ✅ import Provider
import './index.css';
import App from './App.jsx';
import store from './Redux/Store.js'; // ✅ your Redux store
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* ✅ wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
