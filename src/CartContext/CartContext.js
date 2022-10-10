import { createContext } from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const init = JSON.parse(localStorage.getItem('carrito')) || []

export const CartContext = createContext()

const CartProvider = ({children}) => {

    const [cart, setCart] =useState(init)

    const addToCart = (item) => {
        setCart([...cart, item])
    }

    const removeItem = (id) => {
        Swal.fire({
            title: 'Seguro quieres eliminar el producto?',
            // text: "Podrás volver a agregarlo si lo necesitas",
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
            console.log(cart)
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


    const fracaso = () => {
      Swal.fire(
        'Campo incorrecto',
        'Por favor complete correctamente todos los campos',
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

    useEffect(() => {
      localStorage.setItem('carrito', JSON.stringify(cart))
  }, [cart])

    return(
        <CartContext.Provider value={{
            cart,
            exito,
            fracaso,
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