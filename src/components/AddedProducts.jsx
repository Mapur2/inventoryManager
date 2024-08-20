import React, { useState } from 'react'
import { productContext } from '../context/ProductContext';

function AddedProducts({ id, name, price, quantity, image, unitType, count }) {

    const { cartproducts, setCartProducts } = productContext()
    const [ct, setCount] = useState(count)
    function deleteFromCart() {
        setCartProducts((prevData) =>
            prevData.filter((product) =>
                product.id !== id 
            )
        );
    }
    function handluePlus(e) {
        e.preventDefault()
        if (quantity > ct) {
            setCount(prev => prev + 1)
            updateCount(+1)
        }
    }
    const updateCount = (num) => {
        setCartProducts((prevData) =>
            prevData.map((product) =>
                product.id === id ? { ...product, count: product.count+num } : product
            )
        );
        console.log(cartproducts)
    };
    function handleSubtract() {
        if (ct > 1){
            setCount(prev => prev - 1)
            updateCount(-1)
        }
    }
    return (
        <div className='w-1/3 h-44 flex flex-wrap  m-5 items-center justify-between bg-black text-white rounded-xl p-3'>
            <img className='w-1/3 h-full' src={image} alt="" />
            <div>
                <p>Name: {name}</p><br />
                <p>Price: {price} / {unitType}</p><br />
                <p>Quantity: {quantity}</p><br />
            </div>
            <div className=' flex flex-col justify-evenly h-full text-center rounded-sm text-black'>
                <button className=' w-36 text-black bg-white rounded-xl' onClick={handluePlus}><i class="fa-solid fa-plus"></i></button>
                <p className='w-36 text-black bg-white rounded-xl'>{ct}</p>
                <button className=' w-36 text-black bg-white rounded-xl' onClick={handleSubtract}><i class="fa-solid fa-subtract"></i></button>
                <button className=' w-36 text-black bg-white rounded-xl' onClick={deleteFromCart}>Remove from cart</button>
                
            </div>
        </div>
    )
}

export default AddedProducts
