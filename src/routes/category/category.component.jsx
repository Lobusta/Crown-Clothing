import { TitleCategoryPage, CategoriesContainer } from './category.style';
import { useParams } from 'react-router-dom';
import { useState, useEffect , Fragment} from 'react';
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';



const Category = () => {

const {category} = useParams();

const {CategoriesMap} = useContext(CategoriesContext)

const [products, setProducts] = useState(CategoriesMap[category]);


useEffect(() => {
    setProducts(CategoriesMap[category]);
}, [category,CategoriesMap]) 

return (
    <Fragment>
    <TitleCategoryPage>{category.toUpperCase()}</TitleCategoryPage>
    <CategoriesContainer>
        
        {products &&
            products.map((product) => <ProductCard key={product.id} product={product} /> )
        }
    </CategoriesContainer>
    </Fragment>
)

}

export default Category;