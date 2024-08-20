import React, { useEffect,useState } from 'react'
import { userAuth } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children,auth,direct}) {
    const nav = useNavigate()
    console.log(direct)
    const [loading, setLoading] = useState(true)
    const {user,authStatus} = userAuth()
    console.log("Authlayout",user,authStatus)
    useEffect(()=>{
        if(authStatus==false && auth==false)
            nav("/")
        else if(authStatus==true && auth==true)
            nav(direct)
        setLoading(false)
    },[authStatus,nav])
    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout
