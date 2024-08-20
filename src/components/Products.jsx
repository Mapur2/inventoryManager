import React, { useState } from 'react'
import { productContext } from '../context/ProductContext';
import Swal from 'sweetalert2';
import Modal from './Modal';
import UpdateProduct from '../pages/UpdateProduct';
import { deleteProduct } from '../context/useGetUserData';

function Products({ name, price, quantity, image, unitType, id }) {

    const [detail, setDetail] = useState({
        name, price, quantity, unitType
    })
    const [deleted, setDeleted] = useState(false)

    const handleDelete = async () => {
        const deletedProduct = await deleteProduct(id)
        if (deletedProduct == null)
            return alert("Cannot deleted product")
        if (!deletedProduct.success)
            return alert(deletedProduct.message)
        setDeleted(true)
        handleSave("Deleted!", name + " was successfully deleted.", "warning")
    }

    const { cartproducts, setCartProducts } = productContext()
    function showId(e) {
        e.preventDefault()
        for (let i = 0; i < cartproducts.length; i++) {
            const ele = cartproducts[i];
            if (ele.id == id) {
                handleSave("Already Added", name + " is Already added", "info")
                return
            }
        }
        setCartProducts(prev => [...prev, { name, price, quantity, image, unitType, id, count: 1 }])
        console.log(cartproducts)
        handleSave("Saved!", name + ' added to cart.', "success")
    }
    const handleSave = (title = "Saved!", msg, type) => {
        Swal.fire({
            title: title,
            text: msg,
            icon: type,
            confirmButtonText: 'OK',
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
        });
    };

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    return (
        deleted ? <div className="w-1/3 h-44 flex justify-center items-center text-center text-2xl m-5 bg-slate-600 text-white rounded-xl p-3">
            Deleted
        </div> :
            <>
                <div className='w-1/3 h-44 flex flex-wrap  m-5 items-center justify-between bg-black text-white rounded-xl p-3'>
                    <img className='w-1/3 h-full' src={image} alt="" />
                    <div>
                        <p>Name: {detail.name}</p><br />
                        <p>Price: {detail.price} / {unitType}</p><br />
                        <p>Quantity: {detail.quantity}</p><br />
                    </div>

                    <div className=' flex flex-col items-center justify-evenly text-center'>
                        <button className=' w-36 my-3 text-black bg-white rounded-xl hover:bg-lime-500 hover:transition-shadow' onClick={showId}>Add to Cart</button>
                        <button className=' w-36 my-3 text-black bg-white rounded-xl  hover:bg-lime-500 hover:transition-shadow' onClick={openModal}>Update Stock</button>
                        <button className=' w-36 my-3 text-black bg-white rounded-xl  hover:bg-lime-500 hover:transition-shadow' onClick={handleDelete}>Delete Product</button>

                    </div>
                </div>
                <Modal show={showModal} handleClose={closeModal}>
                    <UpdateProduct name={name} price={price} quantity={quantity} unitType={unitType} id={id} updateProduct={setDetail} ></UpdateProduct>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </Modal>
            </>
    )
}

export default Products
