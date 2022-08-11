import * as React from 'react'

import { StyledEngineProvider } from '@mui/material/styles'
import theme from '../../utils/mui-theme'
import ThemeProvider from '@mui/system/ThemeProvider'

import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Navbar />

        <main className="container m-auto">{children}</main>

        <footer className="mt-auto">
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="App-link text-react-blue text-[calc(5px+1vmin)] hover:underline"
          >
            Powered by React
          </a>
        </footer>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
