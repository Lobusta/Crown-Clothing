import { CategoryPreviewContainer, Title, PreviewContainer } from "./Category-Preview.style";
import ProductCard from "../product-card/product-card.component";
import { Link } from 'react-router-dom';

const CategoryPreview = ({title, products}) => {

    return(
        <CategoryPreviewContainer>
            <h2>
                <Title><Link to ={`/shop/${title}`} > {title.toUpperCase()}</Link></Title>
            </h2>
            <PreviewContainer>

                {
                    products
                    .filter((_, idx) => idx < 4 )
                    .map((product) => 
                    <ProductCard key={product.id} product = {product} />)
                }



            </PreviewContainer>




        </CategoryPreviewContainer>
    )




}


export default CategoryPreview;
