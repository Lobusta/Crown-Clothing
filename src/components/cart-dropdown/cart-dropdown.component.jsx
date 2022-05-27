import './cart-dropdown.style.scss'
import Button from '../Button/button.components';


const CartDropdown = () => {

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
            <Button>Checkout</Button>
        </div>
    )



}


export default CartDropdown;