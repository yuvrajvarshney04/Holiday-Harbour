import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.jsx'
import { SearchContextProvider } from './contexts/SearchContext.jsx'

const queryClient = new QueryClient({
  defaultOptions : {
    queries:{
      retry : 0,
      refetchOnWindowFocus : false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client = {queryClient}>
  <AppContextProvider>
  <SearchContextProvider>
   <App />
  </SearchContextProvider>
   
  </AppContextProvider>

  </QueryClientProvider>
  
    
  </React.StrictMode>,
)
