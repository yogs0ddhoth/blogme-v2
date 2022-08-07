import { ThemeProvider } from '@mui/system';
import * as React from 'react';
import logo from '../../logo.svg'
import Navbar from "./Navbar";
import { theme } from '../../utils/mui-theme';
import { Container, Paper } from '@mui/material';

export default function Layout({children}:{children:React.ReactNode}) {
  
  
  return (
    // <div 
    //   className="App
    //    bg-react-background min-h-full min-w-full
    //    text-center m-0 p-0
    //   "
    // >
      <ThemeProvider theme={theme}>
        <Paper>
          <header 
            className="App-header container m-auto
              flex flex-col items-center justify-center 
              text-[white] text-[calc(10px+2vmin)]
            "
          >
            <Navbar/>
            <img src={logo} alt="logo"
              className="App-logo 
                h-[30vmin] pointer-events-none 
                [@media(prefers-reduced-motion:no-preference)]:animate-spin-slow
              " 
            />
            {/* <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p> */}

            <a href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="App-link text-react-blue text-[calc(5px+1vmin)] hover:underline"
            >
              Powered by React
            </a>
            {/* <div className='loader'/> */}

          </header>
          <main className="container m-auto h-[70vmin]">
            {children}
          </main>
        </Paper>
      </ThemeProvider>
    // </div>
  )
}