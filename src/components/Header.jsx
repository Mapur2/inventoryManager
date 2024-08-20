import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks';
import { data } from 'autoprefixer';
import { userAuth } from '../context/UserContext';


function Header() {

    
    const [isOpen, setisOpen] = React.useState(false);
    function handleClick() {
        setisOpen(!isOpen);
    }

    const titles = [
        {
            title: "Dashboard",
            path: "/dashboard",
            selected:true
        },
        {
            title: "Add to Cart",
            path: "/addtocart",
            selected:false
        },
        {
            title:"Add Products",
            path:"/addproduct",
            selected:false
        },
        {
            title:"Profile",
            path:"/profile",
            selected:false
        }
    ]
    const [select, setSelect] = useState(null);
    const {authStatus ,user} = userAuth()

    return (
        <div>
            <nav className={` bg-black fixed top-0 w-full z-30 transition duration-300 ease-in-out mb-16 text-white`}>
                <div className="flex flex-row justify-between items-center py-2">
                    <div className="flex flex-row justify-center md:px-12 md:mx-12 items-center text-center font-semibold">
                        <Link to="/"><h1 className="font-extrabold text-4xl">Inventory Management</h1></Link>

                    </div>
                    <div className="group flex flex-col items-center">
                        <button className="p-2 rounded-lg lg:hidden text-blue-900" onClick={handleClick}>
                            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                {isOpen && (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                )}
                                {!isOpen && (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                )}
                            </svg>
                        </button>
                        {!authStatus && (<div className='hidden space-x-6 lg:inline-block p-5'>
                            <NavLinks />
                        </div>)}
                        {!authStatus &&
                            <div className={`fixed transition-transform duration-300 ease-in-out transit justify-center left-0 w-full h-auto p-24 rounded-lg block lg:hidden shadow-xl top-14 ${isOpen ? "block" : "hidden"} `}>
                                <div className='flex flex-col space-y-6'>
                                    <Link className="px-4 font-extrabold text-gray-400 hover:text-white" to="/#about">
                                        About
                                    </Link>
                                    <Link className="px-4 font-extrabold text-gray-400 hover:text-white" to="/#services">
                                        Services
                                    </Link>
                                    <Link className="px-4 font-extrabold text-gray-400 hover:text-white" to="/contact">
                                        Contact Us
                                    </Link>
                                    <Link className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" to="/get-demo">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        }
                        {authStatus && (<div className='hidden space-x-6 lg:inline-block p-5'>

                            {titles.map((data,index) => (<Link key={data.path} className={`px-4 font-extrabold hover:text-white 
                                ${select==index?"text-white":"text-gray-400"} `} to={data.path} onClick={()=>{setSelect(index)}}>
                                {data.title}
                            </Link>))}

                        </div>)
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
