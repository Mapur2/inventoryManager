import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox'
import { addProduct, createBusiness } from '../context/useGetUserData'
import { userAuth } from '../context/UserContext'

function AddProduct() {
    const nav = useNavigate()
    const [loader, setLoader] = useState(false)
    /*name, price, quantity, unitType */
    const [product, setProduct] = useState({
        name: null,
        price: null,
        quantity: null,
        unitType: "kg",
        image: null
    })
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(product)
        if (product.name == null || product.price == null || product.quantity == null || product.image == null)
            return alert("enter all the details")
        setLoader(true)
        try {
            let formData = new FormData()
            formData.append("name", product.name)
            formData.append("quantity", product.quantity)
            formData.append("unitType", product.unitType)
            formData.append("price", product.price)
            formData.append("image", product.image, product.image.name)
            console.log(formData)
            const res = await addProduct(formData)
            if (res == null)
                return alert("Could not register user")
            if (!res.success)
                return alert(res.message)
            alert(res.message)
            setLoader(false)
            nav("/dashboard")
        } catch (error) {
            setLoader(false)
            console.log(error)
            return alert("Could not register user")
        }
    }

    return (
        loader ? <div className='h-screen flex justify-center items-center'>
            <p>Loading...</p>
        </div> :
            <div className="flex items-center justify-center my-24 border-black">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>

                    <h2 className="text-center text-2xl font-bold leading-tight">Add Product</h2>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className='space-y-5'>
                            <InputBox
                                label=" Name: "
                                placeholder="Enter product name"
                                type='text'
                                data={product.name}
                                onDataChange={(name) => setProduct({ ...product, name: name })}
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
                            <input
                                type="file"
                                placeholder="Enter your number"
                                onChange={e => setProduct({ ...product, image: e.target.files[0] })}
                            />
                            <button type="submit" className="border-2 border-black w-1/2 ml-28 hover:bg-black hover:text-white">
                                Create Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default AddProduct
