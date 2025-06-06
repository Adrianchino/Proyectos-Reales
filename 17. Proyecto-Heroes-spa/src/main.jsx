import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './Style.css'
import { HeroesApp } from './HeroesApp'
//import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
      <HeroesApp />
    </BrowserRouter>
  </StrictMode>,
)
