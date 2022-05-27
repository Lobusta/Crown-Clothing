import { createContext, useEffect, useState  } from "react";


const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);
    

    if (existingCartItem){
     return cartItems.map((cartItem) => 
         cartItem.id === productToAdd.id 
             ?  {...cartItem, quantity: cartItem.quantity +1}
             : cartItem
     );
    }
     return [...cartItems, {...productToAdd, quantity: 1}] 


    
   
}



const removeCartItem = (cartItems, CartItemtoRemove) => {

    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === CartItemtoRemove.id);
    

    if (existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== CartItemtoRemove.id)
    }

        return cartItems.map((cartItem) => 
            cartItem.id === CartItemtoRemove.id 
                ?  {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        );  
   
}

const clearCartItem =  (cartItems, CartItemToClear) => { 

    return cartItems.filter(cartItem => cartItem.id !== CartItemToClear.id)

}

   

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCounter: 0,
    removeItemFromCart: () => {}, 
    clearItemFromCart: () => {},
    cartTotal: 0,

    
});



export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCounter, setcartCounter] = useState(0);
    const [cartTotal , setTotal] = useState(0);
    

    useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
      setcartCounter(newCartCount);
    
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
        setTotal(newCartTotal);
      
      }, [cartItems])
    


    const addItemToCart = (productToAdd) => {

        setCartItems(addCartItem(cartItems, productToAdd));

    }

    const removeItemFromCart = (CartItemToRemove) => {

        setCartItems(removeCartItem(cartItems, CartItemToRemove));

    }

    const clearItemFromCart = (CartItemToClear) => {

        setCartItems(clearCartItem(cartItems, CartItemToClear));

    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCounter, removeItemFromCart, clearItemFromCart, cartTotal};
    

 return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}



