import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logoCart from '../../assets/cart2.png'
import { CartContext } from "../../CartContext/CartContext"
import "./CartWidget.css"


const CartWidget = () => {

    const {cartQuantity, cart} = useContext(CartContext)

    return (
        <Link to='/cart' className="widget widget-visible"> 
            <img 
                src={logoCart}
                alt="carrito" 
                width= "40px"
                height="40px"
            />
            <span className={`widget ${cart.length > 0 ? 'widget-visible' : ''}`}>{cartQuantity()}</span>
        </Link>
            )
    }

export default CartWidget