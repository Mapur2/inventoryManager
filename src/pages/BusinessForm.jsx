import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox'
import { createBusiness } from '../context/useGetUserData'
import { userAuth } from '../context/UserContext'

function BusinessForm() {
    const [business, setBusiness]=useState(null)
    const [business_email,setBusinessEmail]=useState(null)
    const [whatsapp,setWhatsapp]=useState(null)
    const {login}=userAuth()
    async function handleSubmit(e) {
        e.preventDefault()
        if(!business || !business_email || !whatsapp)
            alert("enter all the details")
        //console.log(business,business_email,whatsapp)
        try {
            const res= await createBusiness(business,business_email,whatsapp)
            if(res==null)
                return alert("Could not register user")
            if(!res.success)
                return alert(res.message)
            alert(res.message)
            console.log(res)
            login(res.data.user)
        } catch (error) {
            
        }
    }

    return (
        <div className="flex items-center justify-center my-24 border-black">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>

                <h2 className="text-center text-2xl font-bold leading-tight">Create business account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Get Access to all the features by creating a business Profile&nbsp;
                </p>

                <form onSubmit={handleSubmit}>
                    <div className='space-y-5'>
                        <InputBox
                            label="Business Name: "
                            placeholder="Enter your full name"
                            data={business}
                            onDataChange={(business)=>setBusiness(business)}
                                                    />
                        <InputBox
                            label="Business Email: "
                            placeholder="Enter your email"
                            type="email"
                            data={business_email}
                            onDataChange={(business_email)=>setBusinessEmail(business_email)}
                        />
                        <InputBox
                            label="Whatsapp Number: "
                            type="number"
                            placeholder="Enter your number"
                            data={whatsapp}
                            onDataChange={(number)=>setWhatsapp(number)}
                        />
                        <button type="submit" className="border-2 border-black w-1/2 ml-28 hover:bg-black hover:text-white">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BusinessForm
