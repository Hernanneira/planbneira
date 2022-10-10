import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { CartContext } from "../../CartContext/CartContext"
import { addDoc, collection, getDocs, writeBatch, query, where, documentId } from 'firebase/firestore'
import { db } from "../../firebase/config"
import './checkout.css'
import Swal from 'sweetalert2'

const Checkout = () => {
    
    const {cart, cartTotal, exito, fracaso, removeItem } = useContext(CartContext)
    const [ordenId, setOrdenId] = useState(null)
    const [values, setValues] = useState({
        nombre:'',
        email:'',
        direccion:'',
        telefono:'',
        comentarios:''
    })
    const [errors,setErrors] = useState({});

    const validateForm = () => {
        let errors = {}
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
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
        } 
        else if (values.direccion.length < 3) {
            errors.direccion = "La direccion debe tener mas de 3 caracteres"
        }
    
        if (!values.email.trim()){
            errors.email = "el campo email es requerido."
        } else if (!regexEmail.test(values.email.trim())){
            errors.email = "el campo email es incorrecto."
        }
    
        if (!values.telefono.trim()){
            errors.telefono = "el campo telefono es requerido."
        } else if (values.telefono.length < 7) {
            errors.telefono = "La telefono debe tener mas de 7 numeros"
        }
    
        if(!regexComments.test(values.comentarios.trim())){
            errors.comentarios = "el campo comentarios no debe exceder los 255 caracteres."
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const orden = {
            usuario: values,
            carrito: cart,
            total: cartTotal(),
            fecha: new Date()
        } 

        if((Object.keys(errors).length !== 0) || (values.nombre.length === 0)) {
            fracaso()
        }else{
            const batch = writeBatch(db)
            const ordenesRef = collection(db, 'ordenes')
            const productosRef = collection(db, 'productos')
        
            const q = query(productosRef, where(documentId(), 'in', cart.map(item => item.id)))
    
            const productos = await getDocs(q)
    
            const outOfStock = []
                
            productos.docs.forEach((doc) => {
                const itemInCart = cart.find(item => item.id === doc.id)
    
                if (doc.data().stock >= itemInCart.cantidad) {
                    batch.update(doc.ref, {
                        stock: doc.data().stock - itemInCart.cantidad
                    })
                } else {
                    outOfStock.push(itemInCart)
                }
            })
    
            if (outOfStock.length === 0) {
                batch.commit()
                    .then(() => {
                        addDoc(ordenesRef, orden)
                            .then((doc) => {
                                console.log(doc.id)
                                setOrdenId(doc.id)
                                exito()
                            })
                    })
            } else {
                let itemNoStock =  outOfStock.map((item =>item.descripcion))
                Swal.fire({
                    title: 'Sin stock!',
                    text: `No contamos con sufiente stock de: ${itemNoStock}. ¿desea eliminarlo y continuar?`,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar'
                }).then((result) => {
                    if (result.isConfirmed) {
                    outOfStock.forEach(item => removeItem(item.id))
                    }
                })
            }
        }
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

    return (
        <div className="checkout">
        <div className='container'>
            <h2>Ingresa los datos para tu compra</h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleInputChange}
                    name="nombre"
                    type={"text"} 
                    className="form-control"  
                    placeholder="tu nombre"
                    onBlur={handleBlur}
                    required />
                    {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                <input
                    onChange={handleInputChange}
                    name="email"
                    type={"email"}
                    className="form-control my-3 "
                    placeholder="tu mail"
                    onBlur={handleBlur}
                    required />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                <input
                    onChange={handleInputChange}
                    name="direccion"
                    type={"text"} 
                    className="form-control my-3 " 
                    placeholder="tu direccion"
                    onBlur={handleBlur}
                    required />
                    {errors.direccion && <p className="text-danger">{errors.direccion}</p>}
                <input
                    onChange={handleInputChange}
                    name="telefono"
                    type={"number"} 
                    className="form-control my-3 " 
                    placeholder="telefono"
                    onBlur={handleBlur}
                    required />
                    {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
                    <textarea
                    className="form-control my-3"
                    name="comentarios"
                    type={"text"}
                    cols="50" 
                    rows="5" 
                    placeholder="escribe algun comentario" 
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    >
                    </textarea>
                    {errors.comentarios && <p className="text-danger">{errors.comentarios}</p>}
            <button type="submit" className="btn btn-success">Terminar</button>
            </form>
        </div>
        </div>
    )
}

export default Checkout