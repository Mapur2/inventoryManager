import React, { useEffect, useState } from 'react'
import { userAuth } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { getProducts, logoutUser } from '../context/useGetUserData'
import BusinessForm from './BusinessForm'
import Products from '../components/Products'
import { data } from 'autoprefixer'
import { ProductContextProvider } from '../context/ProductContext'

function Dashboard() {
  const nav = useNavigate()
  const { logout, user, authStatus } = userAuth()

  const [cartproducts, setCartProducts] = useState([]);

  const data = getProducts()


  return (
    <div className='m-5 mt-20 w-full'>

      <h1 className='text-center text-3xl font-bold'>Your Items</h1>
      <div className='w-full '>
        <div className='flex items-center flex-wrap justify-evenly '>
          {data?.data.length > 0 ?
            data.data.map(({ _id, name, price, quantity, image, unitType }) =>
              <Products price={price} quantity={quantity} name={name} image={image} unitType={unitType} id={_id} key={_id} />)
            : (<div className=" mt-24 h-44 flex justify-center items-center text-center text-2xl m-5 bg-slate-600 text-white rounded-xl p-3">
              No products to Show
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
