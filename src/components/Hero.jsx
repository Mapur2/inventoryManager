import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero_img.avif'

function Hero() {
    return (
        <div>
            <div className="hero" id='hero'>
                <div className="m-auto overflow-hidden mx-4 mt-20" >

                    <div className="flex flex-row m-10 items-center ">
                        <div className=" flex flex-col w-1/3">
                            <h1 className="mb-5 md:text-5xl text-3xl font-bold text-black">
                                Inventory Expert
                            </h1>

                            <div className="text-2xl font-semibold mb-5 text-gray-500">
                                Defining future In Your oldest Way.
                            </div>
                            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                                <Link to="/contact" className="text-white bg-black hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>

                            </div>
                        </div>
                        <div className="flex lg:justify-end  w-full justify-evenly">
                            <img alt="card img" className="rounded-lg duration-1000 w-1/2 shadow-slate-600" src={heroImg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
