import { createContext, useState, useReducer } from "react";

import { createAction } from "../utils/reducers/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// import { createContext, useReducer } from "react";
// import { createAction } from "../utils/reducers/reducer.utils.js";

// const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, CartItemtoRemove) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === CartItemtoRemove.id
//   );

//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== CartItemtoRemove.id);
//   }

//   return cartItems.map((cartItem) =>
//     cartItem.id === CartItemtoRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// const clearCartItem = (cartItems, CartItemToClear) => {
//   return cartItems.filter((cartItem) => cartItem.id !== CartItemToClear.id);
// };

// export const CART_ACTION_TYPE = {
//   SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
//   SET_CART_ITEMS: "SET_CART_ITEMS",
//   SET_CART_COUNT: "SET_CART_COUNT",
//   SET_CART_TOTAL: "SET_CART_TOTAL",
// };

// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   cartCounter: 0,
//   cartTotal: 0,
// };

// const cartReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPE.SET_CART_ITEMS:
//       return {
//         ...state,
//         ...payload,
//       };
//     default:
//       throw new Error(`Unhandled type ${type} in cartReducer`);
//   }
// };

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   cartCounter: 0,
//   removeItemFromCart: () => {},
//   clearItemFromCart: () => {},
//   cartTotal: 0,
// });

// export const CartProvider = ({ children }) => {
//   /*
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const [cartCounter, setcartCounter] = useState(0);
//     const [cartTotal , setTotal] = useState(0);

//     useEffect(() => {
//       const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
//       setcartCounter(newCartCount);

//     }, [cartItems])

//     useEffect(() => {
//         const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
//         setTotal(newCartTotal);

//       }, [cartItems])

//       */

//   const [{ cartItems, cartCounter, cartTotal }, dispatch] =
//     useReducer(cartReducer, INITIAL_STATE);

//   const updateCartItemReducer = (newCartItems) => {
//     const newCartCount = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );
//     const newCartTotal = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );

//     const payload = {
//       cartItems,
//       cartCount: newCartCount,
//       cartTotal: newCartTotal,
//     };

//     dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, payload));
//   };

//   const addItemToCart = (productToAdd) => {
//     const newCartItems = addCartItem(cartItems, productToAdd);
//     updateCartItemReducer(newCartItems);
//   };

//   const removeItemFromCart = (CartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, CartItemToRemove);
//     updateCartItemReducer(newCartItems);
//   };

//   const clearItemFromCart = (CartItemToClear) => {
//     const newCartItems = clearCartItem(cartItems, CartItemToClear);
//     updateCartItemReducer(newCartItems);
//   };

//   const setIsCartOpen = (bool) => {
//     dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
//   };

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     cartItems,
//     cartCounter,
//     removeItemFromCart,
//     clearItemFromCart,
//     cartTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
