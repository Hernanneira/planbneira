import { createContext } from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

export const CartContext = createContext()

const init = JSON.parse(localStorage.getItem('carrito')) || []

const CartProvider = ({children},initialForm, validateForm) => {

    const [cart, setCart] =useState(init)
    const [form,setForm] = useState(initialForm);
    const [errors,setErrors] = useState({});

    const addToCart = (item) => {
        setCart([...cart, item])
    }

    const removeItem = (id) => {
        Swal.fire({
            title: 'Seguro quieres eliminar el producto?',
            text: "Podrás volver a agregarlo si lo necesitas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                setCart((cart.filter((item) =>item.id !== id ))),
                'eliminado!',
                'eliminado con exito.',
                'success'
              )
            }
          })
        // return setCart((cart.filter((item) =>item.id !== id )))
    } 

    const isInCart = (id) => {
        return cart.some((item) => item.id === id)
    }
  
    const cartQuantity = () => {
        return cart.reduce((acc,item) => acc + item.cantidad, 0)
    }

    const cartTotal = () => {
        return ( 
            cart.reduce((acc, item)=> acc + item.cantidad * item.precio, 0)
        )
    }

    const emptyCart = () => {
        Swal.fire({
            title: 'Seguro quieres vaciar el carrito?',
            text: "Deberas agregar nuevamente los productos para continuar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Vaciar',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                setCart([]),
                'Vaciado!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }

    const fracaso = () => {
      Swal.fire(
        'Campo incorrecto',
        'Por favor revise todos los campos',
        'error'
    )
    }
    const exito = () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Enviado exitosamente',
        showConfirmButton: false,
        timer: 5000
      })
      setCart([])
    }

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value})
    }
    const handleBlur = (e) =>{
        handleChange(e)
        setErrors(validateForm(form))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setErrors(validateForm(form))

        const orden = {
          usuario: form,
          carrito: cart,
          total: cartTotal(),
          fecha: new Date()
      }

        if((Object.keys(errors).length !== 0) || (form.nombre.length === 0)) {
            fracaso()
        }else{
            exito()
        }

        addDoc(ordenesRef, orden)
            .then((doc)=>{
                setOrdenId(doc.id)
                exito()
            })
    }

    useEffect(() => {
      localStorage.setItem('carrito', JSON.stringify(cart))
  }, [cart])
    return(
        <CartContext.Provider value={{
            form,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            cart,
            addToCart,
            cartQuantity,
            cartTotal,
            emptyCart,
            isInCart,
            removeItem,
            exito,
            fracaso,
        }}>
        {children}
        </CartContext.Provider>
    )
}

export default CartProvider