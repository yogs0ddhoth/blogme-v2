import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getHello } from './api';

interface hello {
  key_1: string
  key_2: string
}
function App() {
  const [getAPI, setGetAPI] = useState({} as hello);

  useEffect(() => {
    try {
      getHello().then(response => {
        if (response !== undefined) {
          setGetAPI(response.data);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div className="App text-center">
      <header 
        className="App-header 
          bg-react-background min-h-screen
          flex flex-col items-center justify-center 
          text-[white] text-[calc(10px+2vmin)]
        "
      >

        <img src={logo} alt="logo"
          className="App-logo 
            h-[40vmin] pointer-events-none 
            [@media(prefers-reduced-motion:no-preference)]:animate-spin-slow
          " 
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="App-link text-react-blue"
        >
          {getAPI.key_1} {getAPI.key_2}!
        </a>
      </header>
    </div>
  );
}

export default App;
