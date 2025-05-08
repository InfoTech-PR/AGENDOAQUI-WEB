import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

localStorage.setItem('dataUser', JSON.stringify({
  user: {
    name: 'ADMINISTRADOR',
    role: 'admin',
  }
  // user: {
  //   name: 'CLIENTE',
  //   role: 'client',
  // }
}));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
