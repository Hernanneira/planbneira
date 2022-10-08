import { createContext } from "react";
import { useState } from "react";
import Swal from 'sweetalert2'

export const CartContext = createContext()

const CartProvider = ({children}) => {

    const [cart, setCart] =useState([])

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

    const bought = () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'compra realizada',
        showConfirmButton: false,
        timer: 3000
      })
      setCart([])
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

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            cartQuantity,
            cartTotal,
            emptyCart,
            isInCart,
            removeItem,
            bought,
        }}>
        {children}
        </CartContext.Provider>
    )
}

export default CartProvider