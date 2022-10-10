import './ItemDetail.css'
import ItemCount from "../itemcount/ItemCount"
import { useContext, useState } from 'react';
import { CartContext } from "../../CartContext/CartContext";
import { Link } from 'react-router-dom';


const ItemDetail = ({item}) => {

    const [cantidad, setCantidad] = useState(1)
    const {cart, addToCart, isInCart } = useContext(CartContext)

    console.log(cart)

    const handleAgregar = () => {
        const itemToCart = {
            id: item.id,
            precio: item.price,
            descripcion: item.description,
            cantidad: cantidad,
            imagen: item.pictureUrl
        }
        isInCart(item.id)
        
        addToCart(itemToCart)
    
    }

    if(item.stock === 0) {
        return (
            <div className='fondo'>
            {   
                <div className='container d-inline-flex detalle'>
                    <img className="imgDetail img-fluid" src={item.pictureUrl} alt="Img"/>
                    <div className='text-white'>
                        <h2>{item.title}{item.imagen}</h2>
                        <p>{item.description}</p>
                        <p>Precio articulo ${item.price}</p>
                        <h2>sin stock!</h2>
                    </div>
                </div>
            }
            </div>
        )
    }

    return (
        <div className='fondo'>
            {   
                <div className='container d-inline-flex detalle'>
                    <img className="imgDetail img-fluid" src={item.pictureUrl} alt="Img"/>
                    <div className='text-white'>
                        <h2>{item.title}{item.imagen}</h2>
                        <p>{item.description}</p>
                        <p>Precio articulo ${item.price}</p>

                        {isInCart(item.id)
                        ?   <>
                            <div>Agregaste exitosamente {cantidad} unidades de {item.title} por ${cantidad * item.price}</div>
                            <Link to="/cart" className ="btn btn-success mx-3">Terminar Compra</Link>
                            <Link className ="btn btn-outline-success mx-3" to="/">Seguir comprando</Link> 
                            </>
                        :   <ItemCount 
                            price={item.price}
                            stock={item.stock} 
                            counter={cantidad}
                            setCounter={setCantidad}
                            handleAdd={handleAgregar}
                            />
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default ItemDetail