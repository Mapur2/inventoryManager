import { useContext,createContext } from "react";

const ProductContext=createContext({
    cartproducts:null,
    setCartProducts:()=>{}
})

export const productContext=()=>{
    return useContext(ProductContext)
}

export const ProductContextProvider = ProductContext.Provider