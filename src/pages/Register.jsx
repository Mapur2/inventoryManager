import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox'
import { registerUser,loginUser } from '../context/useGetUserData'
import { userAuth } from '../context/UserContext'

function Register() {
    const [name,setName]=useState(null)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [number,setNumber] = useState(null)
    const [whatsapp,setWhatsapp]=useState(null)
    const {login} =userAuth()
    const nav = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        if(!name || !email || !password || !number || !whatsapp)
            return alert("enter all the details")
        //console.log(name , email,password, number)
        try {
            const res= await registerUser({fullname:name,password,email,phone:number,whatsapp})
            if(res==null)
                return alert("Could not register user")
            if(!res.success)
                return alert(res.message)
            alert(res.message)
            const user = await loginUser(email, password)
            console.log(user)
            if (user == null)
                return alert("Could not login user")
            if (!user.success)
                return alert(user.message)
            login(user.data)
            nav("/dashboard")
        } catch (error) {
            return alert("Could not register user")
        }
    }

    return (
        <div className="flex items-center justify-center my-24 mt-36 border-black">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className='space-y-5'>
                        <InputBox
                            label="Full Name: "
                            placeholder="Enter your full name"
                            data={name}
                            onDataChange={(name)=>setName(name)}
                                                    />
                        <InputBox
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            data={email}
                            onDataChange={(email)=>setEmail(email)}
                        />
                        <InputBox
                            label="Phone Number: "
                            type="number"
                            placeholder="Enter your number"
                            data={number}
                            onDataChange={(number)=>setNumber(number)}
                        />
                        <InputBox
                            label="Whatsapp Number: "
                            type="number"
                            placeholder="Enter your whatsapp number"
                            data={whatsapp}
                            onDataChange={(whatsapp)=>setWhatsapp(whatsapp)}
                        />
                        <InputBox
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            data={password}
                            onDataChange={(password)=>setPassword(password)}
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

export default Register
