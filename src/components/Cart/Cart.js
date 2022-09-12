import { useContext } from "react"
import { CartContext } from "../CartContext/CartContext"
import { Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'

const Cart = () => {
    const {cart, cartTotal, emptyCart} = useContext(CartContext)

    return(
        <div>
            <h2 className="container my-5">Tus compras 
            </h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Precio unidad</th>
                    </tr>
                </thead>
                <tbody>
                {cart.map((item)=>
                        <tr key={item.id}>
                            <td><img src={item.imagen} alt="producto" style={{height: 100}}/></td>
                            <td>{item.descripcion}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.precio}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={4}>Total de tu compra: ${cartTotal()}</td>
                    </tr>
                </tbody>
                <Button onClick={emptyCart} variant="danger">Vaciar</Button>
            </Table>
        </div>
    )
}

export default Cart