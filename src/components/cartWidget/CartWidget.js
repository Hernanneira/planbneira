import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logoCart from '../../assets/cart2.png'
import { CartContext } from '../CartContext/CartContext'


const CartWidget = () => {

    const {cartQuantity} = useContext(CartContext)

    return (
        <Link to='/cart'> 
            <img 
                src={logoCart}
                alt="carrito" 
                width= "40px"
                height="40px"
            />
            <span>{cartQuantity()}</span>
        </Link>
            )
    }

export default CartWidget