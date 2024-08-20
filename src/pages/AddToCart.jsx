import React, { useState } from 'react'
import { productContext } from '../context/ProductContext'
import AddedProducts from '../components/AddedProducts'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddToCart() {
  const { cartproducts, setCartProducts } = productContext()
  const nav = useNavigate()
  
  const handleBill = () => {
    nav('/bill')
  }

  console.log(cartproducts)
  return (
    cartproducts.length > 0 ?
      <div className='w-full m-5 mt-20'>
        <h1 className='text-center text-3xl font-bold'>Your Cart</h1>
        <div className="flex justify-items-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={()=>setCartProducts([])}>Delete All in Cart</button>
        </div>
        <div className='flex items-center flex-wrap justify-evenly '>
          {

            cartproducts.map(({ id, name, price, quantity, image, unitType, count }) =>
              <AddedProducts id={id} price={price} quantity={quantity} name={name} image={image} unitType={unitType} count={count} key={id} />)

          }
        </div>
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleBill}>Create Bill</button>
        </div>
      </div>
      :
      <div className=" mt-24 h-44 flex justify-center items-center text-center text-2xl m-5 bg-slate-600 text-white rounded-xl p-3">
        Nothing in cart
      </div>
  )
}

export default AddToCart
