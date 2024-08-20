import { data } from 'autoprefixer';
import axios from 'axios'
import { useEffect, useState } from 'react'

const  url= "http://localhost:8000";
const loginUser = async (email, password) => {
    /* try {
        const res=await axios.post("/api/v1/users/login",{
           email,password
        },{withCredentials:true })
        console.log(res)
        return res.data
    } catch (error) {
        return null
    } */
    try {
        const rawResponse = await fetch(url+'/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });
        const content = await rawResponse.json();
        return content
    } catch (error) {
        return null
    }
}


const registerUser = async (email, password, fullname, phone, whatsapp) => {
    //console.log(email,password,fullname,phone)
    try {
        const rawResponse = await fetch(url+'/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(email, password, fullname, phone, whatsapp)
        });
        const content = await rawResponse.json();
        return content
    } catch (error) {
        return null
    }
}
/**
 * Not required
 */
const createBusiness = async (business, business_email, whatsapp) => {

    try {
        //console.log(email,password,fullname,phone)
        const rawResponse = await fetch(url+'/api/v1/users/createbusy', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ business, business_email, whatsapp })
        });
        const content = await rawResponse.json();
        return content
    } catch (error) {
        console.log(error)
        return null
    }
}

const logoutUser = async () => {
    try {
        const res = await axios.get(url+"/api/v1/users/logout", { withCredentials: true })

        return res.data
    } catch (error) {
        return null
    }
}

const deleteProduct=async (id)=>{
    try {
        const res = await axios.get(url+"/api/v1/users/deleteproduct?id="+id, { withCredentials: true })

        return res.data
    } catch (error) {
        return null
    }
}

const addProduct = async (form) => {
    try {
        const rawResponse = await axios.post(url+"/api/v1/users/addproduct", form, {
            withCredentials: true
        })

        return rawResponse.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateProduct= async (product,id )=>{
    product={...product,id}
    console.log(JSON.stringify({...product}))
    const rawResponse = await fetch(url+'/api/v1/users/updateproduct', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({...product})
    });
    const content = await rawResponse.json();
    return content
}

const getProducts = () => {
    const [data,setData]=useState()
    useEffect(() => {

        axios.get(url+"/api/v1/users/getallproducts", {
            withCredentials: true
        })
            .then((res) => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
                setData(null)
            })

    }, [])
    console.log(data)
    return data
}

export { loginUser, logoutUser, registerUser, createBusiness, addProduct, getProducts,updateProduct, deleteProduct }