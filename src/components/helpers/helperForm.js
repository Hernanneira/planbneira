// import { addDoc, collection, getDocs, writeBatch, query, where, documentId } from 'firebase/firestore'
// import { db } from "../../firebase/config"
// import Swal from 'sweetalert2'
// import { CartContext } from "../../CartContext/CartContext"
// import { useContext, useState } from "react"


// export const HelperForm = () => {
//     const {cart, cartTotal, exito, fracaso, removeItem } = useContext(CartContext)
//     const [ordenId, setOrdenId] = useState(null)
//     const [values, setValues] = useState({
//         nombre:'',
//         email:'',
//         direccion:'',
//         telefono:'',
//         comentarios:''
//     })
//     const [errors,setErrors] = useState({});

//     const handleInputChange = (e) => {
//          setValues({
//              ...values,
//              [e.target.name]: e.target.value
//          })
//      }
    
//      const handleBlur = (e) =>{
//          handleInputChange(e)
//          setErrors(validateForm(values))
//      }
    
//      const handleSubmit = async (e) => {
//          e.preventDefault()
//          const orden = {
//              usuario: values,
//              carrito: cart,
//              total: cartTotal(),
//              fecha: new Date()
//          } 
    
//          if((Object.keys(errors).length !== 0) || (values.nombre.length === 0)) {
//              fracaso()
//          }else{
//              const batch = writeBatch(db)
//              const ordenesRef = collection(db, 'ordenes')
//              const productosRef = collection(db, 'productos')
         
//              const q = query(productosRef, where(documentId(), 'in', cart.map(item => item.id)))
     
//              const productos = await getDocs(q)
     
//              const outOfStock = []
                 
//              productos.docs.forEach((doc) => {
//                  const itemInCart = cart.find(item => item.id === doc.id)
     
//                  if (doc.data().stock >= itemInCart.cantidad) {
//                      batch.update(doc.ref, {
//                          stock: doc.data().stock - itemInCart.cantidad
//                      })
//                  } else {
//                      outOfStock.push(itemInCart)
//                  }
//              })
     
//              if (outOfStock.length === 0) {
//                  batch.commit()
//                      .then(() => {
//                          addDoc(ordenesRef, orden)
//                              .then((doc) => {
//                                  console.log(doc.id)
//                                  setOrdenId(doc.id)
//                                  exito()
//                              })
//                      })
//              } else {
//                  let itemNoStock =  outOfStock.map((item =>item.descripcion))
//                  console.log(outOfStock)
//                  console.log(itemNoStock)
//                  Swal.fire({
//                      title: 'Sin stock!',
//                      text: `No contamos con sufiente stock de: ${itemNoStock}. ¿desea eliminarlo y continuar?`,
//                      icon: 'error',
//                      showCancelButton: true,
//                      confirmButtonColor: '#3085d6',
//                      cancelButtonColor: '#d33',
//                      confirmButtonText: 'Eliminar'
//                  }).then((result) => {
//                      if (result.isConfirmed) {
//                      outOfStock.forEach(item => removeItem(item.id))
//                      }
//                  })
//              }
//          }
//      }
//     }