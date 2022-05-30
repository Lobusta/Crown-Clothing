import { Outlet  } from "react-router-dom";
import { Fragment , useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";
import { NavigationContainer , LogoContainer , NavLinksContainer , Navlink } from "./navigation.styles";


const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const {isCartOpen } = useContext(CartContext); 
    

    
    

    return (
        <Fragment>
            <NavigationContainer>

              <LogoContainer to='/'>
                 <CrwnLogo className="logo"/>
              </LogoContainer>

              <NavLinksContainer>
                <Navlink to = '/shop'> SHOP</Navlink>
                <Navlink to = '/contact'> CONTACT</Navlink>
                {
                  currentUser ? (
                    <Navlink as='span' onClick={signOutUser} >SIGNOUT</Navlink>
                   ) : (
                    <Navlink to = '/auth'> SIGNIN</Navlink>
                  )
                }
                <CartIcon/>
              </NavLinksContainer>
              {isCartOpen && <CartDropdown/>}
              

            </NavigationContainer>
            <Outlet/>

        </Fragment>


    )







}

export default Navigation;