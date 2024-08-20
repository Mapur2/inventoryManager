import React, { useRef, useState } from 'react'
import { productContext } from '../context/ProductContext';
import { userAuth } from '../context/UserContext';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Bill() {
    // Calculate total price
    const { cartproducts, setCartProducts } = productContext()
    const total = cartproducts.reduce((acc, item) => acc + item.count * item.price, 0);
    const { logout, user, authStatus } = userAuth()
    const contentRef = useRef();
    const downloadPDF = async () => {
        const element = contentRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

        pdf.save(customer+'.pdf');
    };

    const [customer, setCustomer] = useState(null)
    const handleSave = () => {
        Swal.fire({
            title: 'Warning',
            text: "Enter customer name",
            icon: 'warning',
            confirmButtonText: 'OK',
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
        });
    };
    const handleCustomer = () => {
        if (customer == null || customer.trim() == '')
            handleSave()
        else {
            downloadPDF()
        }
    }
    const d = new Date()
    const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
    return (
        <div className='m-5 mt-24 w-full' >
            <div className="flex justify-center m-6">
                <label htmlFor="">Customer name:</label>
                &nbsp;&nbsp;&nbsp;
                <input type="text" className=' bg-black text-white' placeholder='Enter customer name' value={customer} onChange={e => setCustomer(e.target.value)} />
            </div>
            <div ref={contentRef} className="p-6 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Invoice</h1>
                <div className='flex justify-between items-center'>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Company</h2>
                        <p className="text-gray-700">{user.fullname}</p>
                        <p className="text-gray-500">+91 {user.phone}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Customer</h2>
                        <p className="text-gray-700">{customer}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Date</h2>
                    <p className="text-gray-700">{date}</p>
                </div>
                <hr />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-4 text-left">Item</th>
                                <th className="py-2 px-4 text-left">Quantity</th>
                                <th className="py-2 px-4 text-left">Price</th>
                                <th className="py-2 px-4 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartproducts.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{item.name}</td>
                                    <td className="py-2 px-4 text-center">{item.count}</td>
                                    <td className="py-2 px-4 text-right">${item.price.toFixed(2)}</td>
                                    <td className="py-2 px-4 text-right">${(item.count * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="py-2 px-4 text-right font-bold">Total:</td>
                                <td className="py-2 px-4 text-right font-bold">${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center m-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleCustomer}>Confirm & Download PDF</button>
            </div>
        </div>
    )
}

export default Bill
