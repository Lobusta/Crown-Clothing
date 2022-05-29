import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import './categories-preview.style.scss'
import CategoryPreview from "../../components/Category-Preview/Category-Preview.component";




const CategoriesPreview = () => {

    const {CategoriesMap} = useContext(CategoriesContext);


    



    return (
       <Fragment>
           {
             Object.keys(CategoriesMap).map((title) => {

              const products = CategoriesMap[title];
              
              return ( <CategoryPreview key={title} title={title} products={products} />
              )
             
            
            
            })}
          
        

          </Fragment>
    )

}


export default CategoriesPreview;