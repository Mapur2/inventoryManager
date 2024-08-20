import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox'
import { addProduct, createBusiness, updateProduct } from '../context/useGetUserData'
import { userAuth } from '../context/UserContext'
import Swal from 'sweetalert2'


function UpdateProduct( props) {
    
    /*name, price, quantity, unitType */
    const [product, setProduct] = useState({
        name:props.name,
        price:props.price,
        quantity:props.quantity,
        unitType:props.unitType,
    })
    const handleSave = () => {
        Swal.fire({
            title: 'Saved!',
            text: props.name + ' updated.',
            icon: 'success',
            confirmButtonText: 'OK',
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
        });
    };
    async function handleSubmit(e) {
        e.preventDefault()
        if (product.name == null || product.price == null || product.quantity == null )
            return alert("Enter all the details")
        try {
            const res = await  updateProduct(product,props.id )
            if (res == null)
                return alert("Could not update product")
            if (!res.success)
                return alert(res.message)
            handleSave()
            props.updateProduct({...product})
            
        } catch (error) {
            console.log(error)
            return alert("Could not update product")
        }
    }

    return (
        
            <div className="flex items-center justify-center border-black">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>

                    <h2 className="text-center text-2xl font-bold leading-tight">Update {props.name}</h2>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className='space-y-5'>
                            <InputBox
                                label=" Name: "
                                placeholder="Enter product name"
                                type='text'
                                data={product.name}
                                onDataChange={(name) => setProduct({ ...product, name })}
                            />
                            <InputBox
                                label="Quantity: "
                                placeholder="Enter Quantity"
                                type="number"
                                data={product.quantity}
                                onDataChange={(quantity) => setProduct({ ...product, quantity })}
                            />
                            <InputBox
                                label="Price: "
                                type="number"
                                placeholder="Enter your number"
                                data={product.price}
                                onDataChange={(price) => setProduct({ ...product, price })}
                            />
                            <select name="" id="" onClick={e => setProduct({ ...product, unitType: e.currentTarget.value })}>
                                <option value="kg">kg</option>
                                <option value="pieces">pieces</option>
                            </select>
                            <button type="submit" className="border-2 border-black w-1/2 ml-28 hover:bg-black hover:text-white">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default UpdateProduct
