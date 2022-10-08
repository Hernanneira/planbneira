import { addDoc, collection } from "firebase/firestore"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { CartContext } from "../../CartContext/CartContext"
import { db } from "../../firebase/config"
import Swal from 'sweetalert2'
import './checkout.css'

const Checkout = () => {
    
    const {cart, cartTotal, bought} = useContext(CartContext)
    const [ordenId, setOrdenId] = useState(null)
    const [values, setValues] = useState({
        nombre:'',
        email:'',
        direccion:'',
        telefono:'',
    })
    const [errors,setErrors] = useState({});

    const validateForm = () => {
        let errors = {}
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexComments = /^.{0,255}$/;
    
        if (!values.nombre.trim()){
            errors.nombre = "el campo nombre es requerido."
        } else if (!regexName.test(values.nombre.trim())){
            errors.nombre = "el campo nombre solo acepta letras y espacios en blanco."
        } else if (values.nombre.length < 3) {
            errors.nombre = "el nombre debe tener mas de 3 caracteres"
        }
        
        if (!values.direccion.trim()){
            errors.direccion = "el campo direccion es requerido."
        } else if (values.direccion.length < 3) {
            errors.direccion = "La direccion debe tener mas de 3 caracteres"
        }
    
        if (!values.email.trim()){
            errors.email = "el campo email es requerido."
        } else if (!regexEmail.test(values.email.trim())){
            errors.email = "el campo email ses incorrecto."
        }
    
        if (!values.telefono.trim()){
            errors.telefono = "el campo telefono es requerido."
        } else if (values.telefono.length < 7) {
            errors.telefono = "La telefono debe tener mas de 7 numeros"
        }
    
        // if(!regexComments.test(values.comentarios.trim())){
        //     errors.comentarios = "el campo comentarios no debe exceder los 255 caracteres."
        // }
        return errors
    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleBlur = (e) =>{
        handleInputChange(e)
        setErrors(validateForm(values))
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

        // if(values.nombre.length < 3) {
        //     Swal.fire(
        //         'Nombre incorrecto',
        //         'Por favor escríbelo nuevamente',
        //         'error'
        //     )
        //     return
        // }

        // if(values.email.length < 3) {
        //     Swal.fire(
        //         'email incorrecto',
        //         'Por favor escríbelo nuevamente',
        //         'error'
        //     )
        //     return
        // }

        // if(values.direccion.length < 4) {
        //     Swal.fire(
        //         'direccion incorrecto',
        //         'Por favor escríbelo nuevamente',
        //         'error'
        //     )
        //     return
        // }

        // if(values.telefono.length < 8) {
        //     Swal.fire(
        //         'telefono incorrecto',
        //         'Por favor escríbelo nuevamente',
        //         'error'
        //     )
        //     return
        // }

        addDoc(ordenesRef, orden)
            .then((doc)=>{
                setOrdenId(doc.id)
                bought()
            })
        
    }

    if(ordenId) {
        return (
            <div>
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
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleInputChange}
                    name="nombre"
                    type={"text"} 
                    className="form-control my-3"  
                    placeholder="tu nombre"
                    onBlur={handleBlur} />
                    {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                <input
                    onChange={handleInputChange}
                    name="email"
                    type={"email"}
                    className="form-control my-3 "
                    placeholder="tu mail"
                    onBlur={handleBlur} />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                <input
                    onChange={handleInputChange}
                    name="direccion"
                    type={"text"} 
                    className="form-control my-3 " 
                    placeholder="tu direccion"
                    onBlur={handleBlur} />
                    {errors.direccion && <p className="text-danger">{errors.direccion}</p>}
                <input
                    onChange={handleInputChange}
                    name="telefono"
                    type={"number"} 
                    className="form-control my-3 " 
                    placeholder="telefono"
                    onBlur={handleBlur} />
                    {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
            <button type="submit" className="btn btn-success">Terminar</button>
            </form>
        </div>
    )
}

export default Checkout