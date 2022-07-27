import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';

import { hello } from 'custom-types';
import { getHello } from './api';

function App() {
  const [getAPI, setGetAPI] = useState({} as hello);
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    try {
      getHello().then(response => {
        if (response !== undefined) {
          setGetAPI(response.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Layout hello={getAPI}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/post' element={<Post/>} />
      </Routes>
    </Layout>
  );
}

export default App;
