import { useContext } from "react"
import { CartContext } from "../../CartContext/CartContext"
import { Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Tacho from "../../assets/trash.svg"
import {Link } from 'react-router-dom'
import "./Cart.css"

const Cart = () => {
    const {cart, cartTotal, emptyCart, removeItem} = useContext(CartContext)

    return(
        <div className="cart"> {
            cart.length === 0
            ?   <> 
                <h2>Tu carrito esta Vacio</h2>
                <Link className ="btn btn-success" to="/">ir a comprar</Link> 
                </>
            :   
            <>
            <h2>Tus compras</h2>
            <Table striped bordered hover variant="dark" style={{marginBottom: 0}}>
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
                            <td><img src={item.imagen} alt="producto" style={{height: 50}}/> <Button onClick={()=>removeItem(item.id)} variant="danger" ><img src={Tacho} alt="tacho"/></Button></td>
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
                <Link to= '/checkout' className="btn btn-success mx-2">Terminar mi compra</Link>
            </Table>
            </>
            }
        </div>
    )
}

export default Cart