import './cart-dropdown.style.scss'
import Button from '../Button/button.components';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { Link } from 'react-router-dom';

const CartDropdown = () => {


    const {cartItems} = useContext(CartContext);

    return(
        <div className='cart-dropdown-container'>

            <div className='cart-items'>
                {cartItems.map (item => <CartItem key={item.id} cartItem = {item}/>)}
            </div>

            <Link className = 'nav-link' to = '/checkout'><Button>Checkout</Button></Link>
        </div>
    )



}


export default CartDropdown;