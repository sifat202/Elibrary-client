import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router/router.jsx'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './Authpovider/Authprovider.jsx'

// 1. Import React Toastify pieces
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
    {/* 2. Global Toast Container component */}
    <ToastContainer 
      position="top-right" 
      autoClose={3000} 
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </StrictMode>,
)