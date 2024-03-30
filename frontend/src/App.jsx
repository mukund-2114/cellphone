import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Footer from './components/Footer'
import SingleProduct from './components/SingleProduct'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddProducts from './components/AddProducts'
import Register from './components/Register'
import AdminPanel from './components/AdminPanel'
import AdminProducts from './components/AdminProducts'
import AdminCustomers from './components/AdminCustomers'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/product/:id' element={<SingleProduct/>}/>
          <Route path='/addproduct' element={<AddProducts/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin' element={<AdminPanel/>}/>
          <Route path='/admin/product' element={<AdminProducts/>}/>
          <Route path='/admin/customer' element={<AdminCustomers/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
    )
}

export default App
