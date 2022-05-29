import './category.style.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
    <div className='categories-container'>
        {products &&
            products.map((product) => <ProductCard key={product.id} product={product} /> )
        }
    </div>
)

}

export default Category;