import ItemList from "../itemList/ItemList"
import "./ItemListContainer.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where } from "firebase/firestore"
import {db } from "../../firebase/config"
import SpinnerS from "../spinner/spinner"

const ItemListContainer = () => {

const [productos, setProductos] = useState(null)
const [loading, setLoading] = useState(true)
const { categoriaId } = useParams()

  useEffect(()=>{
    setLoading(true)
    const productosRef = collection(db,'productos')
    const q = categoriaId
                ?query(productosRef, where ('categoria', '==', categoriaId))
                :productosRef
    getDocs(q)
        .then((snap)=>{
            const productosDB = snap.docs.map( (doc) => ({id: doc.id, ...doc.data()}) )
            setProductos(productosDB)
        })
    .finally(()=>{
        setLoading(false)
    })
}, [categoriaId])

    return(
    <div className='fondo text-center'>
        <h2 className="container text-warning bg-dark border border-warning">
          Productos
        </h2>
        { loading 
            ?
            <SpinnerS />
            :
            <ItemList produc={productos}/>
            }
    </div>
  )}
  
export default ItemListContainer