import { ProductCardContainer, Footer, Name, Price  } from './product-card.style';
import Button , {Button_type_classes} from '../Button/button.components';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({product}) => {

    const { name , price, imageUrl} = product;

    const {addItemToCart} = useContext(CartContext);

    const addProducttoCart  = () => {
        addItemToCart(product);
    }
    

    return (

        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button onClick = {addProducttoCart} buttonType={Button_type_classes.inverted}>ADD TO CART</Button>

        </ProductCardContainer>
    )
}


export default ProductCard;