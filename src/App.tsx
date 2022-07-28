import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Layout from './components/Layout';

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
      <Outlet/>
    </Layout>
  );
}

export default App;
