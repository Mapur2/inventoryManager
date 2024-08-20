import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Profile from './pages/Profile.jsx'
import AddToCart from './pages/AddToCart.jsx'
import Bill from './pages/Bill.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={
        <AuthLayout auth={true} direct={"/dashboard"}>
          <Dashboard />
        </AuthLayout>
      } />
      <Route path='/addproduct' element={
        <AuthLayout auth={true} direct={'/addproduct'}>
          <AddProduct />
        </AuthLayout>
      } />
      <Route path='/profile' element={
        <AuthLayout auth={true} direct={'/profile'}>
          <Profile />
        </AuthLayout>
      } />
      <Route path="/addtocart" element={
        <AuthLayout auth={true} direct={"/addtocart"}>
          <AddToCart />
        </AuthLayout>
      } />

      <Route path="/bill" element={
        <AuthLayout auth={true} direct={"/bill"}>
          <Bill />
        </AuthLayout>
      } />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>

  </React.StrictMode>,
)
