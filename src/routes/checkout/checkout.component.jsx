import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.style';
import CheckoutItemList from '../../components/checkout-itemlist/checkout-itemlist.component';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const Checkout = () => {

    
    const {cartItems, cartTotal} = useContext(CartContext);


    return(
        <CheckoutContainer>
            <CheckoutHeader>
            <HeaderBlock>
            <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
            <span>Description</span>
            </HeaderBlock> 
            <HeaderBlock>
            <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
            <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
            <span>Remove</span>
            </HeaderBlock>

            </CheckoutHeader>
            {cartItems.map (item => <CheckoutItemList key={item.id} cartItem = {item}/>)}


            <Total>Total = ${cartTotal}</Total>
        </CheckoutContainer>
    )


}


export default Checkout;