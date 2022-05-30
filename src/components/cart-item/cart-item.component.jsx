import { CartItemContainer ,ImageContainer ,ItemDetails, Itemname } from "./cart-item.style";


const CartItem = ({cartItem}) => {

    const {name,imageUrl, quantity, price} = cartItem;

    return(
        <CartItemContainer>
            <ImageContainer src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Itemname>{name}</Itemname>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )



}


export default CartItem;