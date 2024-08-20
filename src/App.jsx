import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import axios from 'axios'
import { UserContextProvider } from './context/UserContext'
import { ProductContextProvider } from './context/ProductContext'

function App() {
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const login = (userDetail) => {
    setUser(userDetail)
    setAuthStatus(true)
  }
  const logout = () => {
    setAuthStatus(false)
    setUser(null)
  }
  const loginContext = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/detail", { withCredentials: true })
      //console.log(res.data)
      if (res.data.success) {
        login(res.data.data)
        setLoading(false)
        navigate("/dashboard")
      }
      else
        logout()
    } catch (error) {
      navigate("/")
      //console.log("loginContext", error)
    }
  }

  const [cartproducts, setCartProducts] = useState([]);
  useEffect(() => {
    //console.log(user)
    loginContext()
    setLoading(false)
  }, [])


  {
    return (
      loading ? <div className='h-screen'>Loading....</div> : (
        <>
          <UserContextProvider value={{ user, authStatus, login, logout }}>
            <Header />
          
            <ProductContextProvider value={{ cartproducts, setCartProducts }}>
              <Outlet />
            </ProductContextProvider>

            <Footer />
          </UserContextProvider>
        </>
      ))
  }
}

export default App
