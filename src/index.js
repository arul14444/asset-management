import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Asset from './pages/asset';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AssetCondition from './pages/asset_condition';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/asset' element={<Asset/>} />
          <Route path='/assetcondition' element={<AssetCondition/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
