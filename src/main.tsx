import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext.tsx';
import AuthContextProvider from './contexts/AuthContext.tsx';
import { Provider } from 'react-redux';
import { store } from './api/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
);
