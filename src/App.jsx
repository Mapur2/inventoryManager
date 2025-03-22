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
    setUser(userDetail.user)
    localStorage.setItem("accesstoken", userDetail.accesstoken)
    setAuthStatus(true)
  }
  const logout = () => {
    setAuthStatus(false)
    localStorage.clear();
    setUser(null)
  }


  const [cartproducts, setCartProducts] = useState([]);
  /* useEffect(() => {
    const loginContext = async () => {
      try {
        const raw = await fetch("https://inventry-backend-05uj.onrender.com/api/v1/users/detail", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
          }
        });
        const res = await raw.json();
        console.log(res)
        if (res?.success) {
          login(res.data)
          setLoading(false)
          navigate("/dashboard")
        }
        else {
          logout()

          navigate("/")
        }
      } catch (error) {
        navigate("/")
        console.log("loginContext", error)
      }
    }
    loginContext()
    setLoading(false)
  }, []) */
  useEffect(() => {
    const loginContext = async () => {
      const token = localStorage.getItem("accesstoken");
      if (!token) {
        logout();
        navigate("/");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://inventry-backend-05uj.onrender.com/api/v1/users/detail", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const res = await response.json();
        console.log(res);

        if (res?.success) {
          login(res.data);
          navigate("/dashboard");
        } else {
          logout();
          navigate("/");
        }
      } catch (error) {
        console.log("loginContext error:", error);
        logout();
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loginContext();
  }, [navigate]);


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
