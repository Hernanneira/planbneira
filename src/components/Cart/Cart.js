import { useContext } from "react"
import { CartContext } from "../CartContext/CartContext"
import { Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Tacho from "../../assets/trash.svg"
import {Link} from 'react-router-dom'

const Cart = () => {
    const {cart, cartTotal, emptyCart, removeItem} = useContext(CartContext)

    return(
        <div> {
            cart.length === 0
            ?   <> 
                <h2 className="container">Aun no agregaste productos a tu carrito</h2>
                <Link to="/">ir a comprar</Link> 
                </>
            :   
            <>
            <h2 className="container my-5">Tus compras</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Precio unidad</th>
                        <th>Sub total</th>
                    </tr>
                </thead>
                <tbody>
                {cart.map((item)=>
                        <tr key={item.id}>
                            <td><img src={item.imagen} alt="producto" style={{height: 100}}/> <Button onClick={()=>removeItem(item.id)} variant="danger" ><img src={Tacho} alt="tacho"/></Button></td>
                            <td>{item.descripcion}</td>
                            <td>{item.cantidad} </td>
                            <td>${item.precio}</td>
                            <td>${item.precio * item.cantidad}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={5}>Total de tu compra: ${cartTotal()}</td>
                    </tr>
                </tbody>
                <Button onClick={emptyCart} variant="danger">Vaciar</Button>
            </Table>
            </>
            }
        </div>
    )
}

export default Cart