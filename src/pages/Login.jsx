import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox'
import { loginUser } from '../context/useGetUserData'
import { userAuth } from '../context/UserContext'

function Login() {
    const nav = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const { login } = userAuth()
    async function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password)
            return alert("enter all the details")
        try {
            const user = await loginUser(email, password)
            console.log(user)
            if (user == null)
                return alert("Could not login user")
            if (!user.success)
                return alert(user.message)
            login(user.data)
            nav("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center my-24 mt-36 border-black">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                <form className='' onSubmit={handleSubmit}>
                    <div className='space-y-5'>
                        <InputBox
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            data={email}
                            onDataChange={(email) => setEmail(email)}
                        />
                        <InputBox
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            data={password}
                            onDataChange={(password) => setPassword(password)}
                        />
                        <button className="border-2 border-black w-1/2 ml-28 hover:bg-black hover:text-white" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
