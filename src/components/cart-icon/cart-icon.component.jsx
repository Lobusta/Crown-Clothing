import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CartIconContainer, ShoppingIconStyle, CartCounter } from './cart-icon.style';



const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCounter} = useContext(CartContext);



    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)


    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconStyle/>
            <CartCounter>{cartCounter}</CartCounter>
        </CartIconContainer>
    )



}

export default CartIcon;