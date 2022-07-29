import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Post from './pages/Post';

import './index.css';

import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Home/>} />
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path=':postId' element={<Post/>} />
          <Route path='login' element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
