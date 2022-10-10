import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { CartContext } from "../../CartContext/CartContext"
import { addDoc, collection, getDocs, writeBatch, query, where, documentId } from 'firebase/firestore'
import { db } from "../../firebase/config"
import './checkout.css'
import Swal from 'sweetalert2'
import { useForm } from "../../CartContext/useForm";

const Checkout = () => {
    
    const {cart, cartTotal, exito, fracaso, removeItem } = useContext(CartContext)
    const [ordenId, setOrdenId] = useState(null)
    const {form, errors,setErrors, handleChange, handleBlur, validationForm} = useForm({
        nombre:'',
        email:'',
        direccion:'',
        telefono:'',
        comentarios:''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const orden = {
            usuario: form,
            carrito: cart,
            total: cartTotal(),
            fecha: new Date()
        }
        setErrors(validationForm(form))

        if((Object.keys(errors).length !== 0) || (form.nombre.length === 0)) {
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
                    onChange={handleChange}
                    name="nombre"
                    type={"text"} 
                    className="form-control"  
                    placeholder="tu nombre"
                    onBlur={handleBlur}
                    required />
                    {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                <input
                    onChange={handleChange}
                    name="email"
                    type={"email"}
                    className="form-control my-3 "
                    placeholder="tu mail"
                    onBlur={handleBlur}
                    required />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                <input
                    onChange={handleChange}
                    name="direccion"
                    type={"text"} 
                    className="form-control my-3 " 
                    placeholder="tu direccion"
                    onBlur={handleBlur}
                    required />
                    {errors.direccion && <p className="text-danger">{errors.direccion}</p>}
                <input
                    onChange={handleChange}
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
                    onChange={handleChange}
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