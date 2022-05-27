import { createContext, useState , useEffect } from "react";
import PRODUCTS from '../shop-data.json';




//as the actual value you want to access
export const ProductContext = createContext({
    product: [],
    
});



export const ProductProvider = ({children}) => {
    const [product, setProduct] = useState(PRODUCTS);
    const value = {product};
    
  
    useEffect(() => {
     
    }, [])
 return <ProductContext.Provider value = {value}>{children}</ProductContext.Provider>
}