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
        return setCart((cart.filter((item) =>item.id !== id )))
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

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            cartQuantity,
            cartTotal,
            emptyCart,
            isInCart,
            removeItem,
        }}>
        {children}
        </CartContext.Provider>
    )
}

export default CartProvider