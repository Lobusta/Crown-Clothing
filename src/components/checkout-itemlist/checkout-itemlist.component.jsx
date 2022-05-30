
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CheckoutItemContainer, ImageContainer ,Image ,Name ,Quantity ,Arrow, Value ,Price , Removebutton} from './checkout-itemlist.style';

const CheckoutItemList = ({cartItem}) => {

    const {name, imageUrl, quantity, price} = cartItem;
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);

    const removeItemHandler = () => removeItemFromCart(cartItem);

    const clearItemHandler = () => clearItemFromCart(cartItem);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
            <Image src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler} >&#10094;  </Arrow>
                    <Value> {quantity}</Value>
                <Arrow onClick={addItemHandler}>   &#10095;</Arrow>
            </Quantity>

            
        
            <Price>{price}</Price>
            <Removebutton onClick={clearItemHandler} >&#10005;</Removebutton>
        </CheckoutItemContainer>
    )





}



export default CheckoutItemList;