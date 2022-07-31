import { hello } from "custom-types";
import React from "react";
import logo from '../../logo.svg'
import Navbar from "./Navbar";


export default function Layout({children}:{children?:React.ReactNode}) {
  
  
  return (
    <div 
      className="App
       bg-react-background min-h-full
       text-center
      "
    >
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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="App-link text-react-blue"
        >
          Hello World!
        </a>
        <div className='loader'/>

      </header>
      <main className="container m-auto h-[70vmin]">
        {children !== undefined ? children : <></>}
      </main>
    </div>
  )
}