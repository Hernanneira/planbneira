import { addDoc, collection } from "firebase/firestore"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { CartContext } from "../../CartContext/CartContext"
import { db } from "../../firebase/config"
import Swal from 'sweetalert2'
import './checkout.css'



const Checkout = () => {
    
    const {cart, cartTotal, exito} = useContext(CartContext)
    const [ordenId, setOrdenId] = useState(null)
    const [values, setValues] = useState({
        nombre:'',
        email:'',
        direccion:'',
        telefono:'',
        comentarios:''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const orden = {
            usuario: values,
            carrito: cart,
            total: cartTotal(),
            fecha: new Date()
        } 
        console.log(orden)


        if(values.nombre.length < 3) {
            Swal.fire(
                'Nombre incorrecto',
                'Por favor escríbelo nuevamente',
                'error'
            )
            return
        }

        if(values.email.length < 3) {
            Swal.fire(
                'email incorrecto',
                'Por favor escríbelo nuevamente',
                'error'
            )
            return
        }

        if(values.direccion.length < 4) {
            Swal.fire(
                'direccion incorrecto',
                'Por favor escríbelo nuevamente',
                'error'
            )
            return
        }

        if(values.telefono.length < 8) {
            Swal.fire(
                'telefono incorrecto',
                'Por favor escríbelo nuevamente',
                'error'
            )
            return
        }

        addDoc(ordenesRef, orden)
            .then((doc)=>{
                setOrdenId(doc.id)
                exito()
            })
        
    }

    if(ordenId) {
        return (
            <div className="checkout_finished">
                <h2>Compra realizada</h2>
                <p>tu numero de orden es: {ordenId}</p>
            </div>
        )
    }
    
    if(cart.length === 0){
        return <Navigate to='/'/>
    }

    const ordenesRef = collection(db, 'ordenes')


    return (
        <div className='checkout'>
        <div className='container'>
            <h2> Ingresa tus datos para la compra</h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleInputChange}
                    name="nombre"
                    type={"text"} 
                    className="form-control my-3"  
                    placeholder="tu nombre" />
                <input
                    onChange={handleInputChange}
                    name="email"
                    type={"email"}
                    className="form-control my-3"
                    placeholder="tu mail" />
                <input
                    onChange={handleInputChange}
                    name="direccion"
                    type={"text"} 
                    className="form-control my-3" 
                    placeholder="tu direccion" />
                <input
                    onChange={handleInputChange}
                    name="telefono"
                    type={"number"} 
                    className="form-control my-3" 
                    placeholder="telefono" />
            <button type="submit" className="btn btn-success">Terminar</button>
            </form>
        </div>
        </div>
    )
}

export default Checkout