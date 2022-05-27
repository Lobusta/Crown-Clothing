import './cart-item.style.scss'


const CartItem = ({cartItem}) => {

    const {name,imageUrl, quantity, price} = cartItem;

    return(
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <h1 className='name'>{name}</h1>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    )



}


export default CartItem;