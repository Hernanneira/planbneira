import Item from "../item/Item"
import { useEffect, useState } from "react"
import "./ItemList.css"
// import pedirDatos from "../helpers/PedirDatos"
import { useParams } from "react-router-dom"
import SpinnerS from "../spinner/spinner"
import { collection, getDocs, query, where } from "firebase/firestore"
import {db } from "../../firebase/config"

const ItemList = () => {

const [productos, setProductos] = useState(null)
const [loading, setLoading] = useState(true)
const { categoriaId } = useParams()
console.log(categoriaId)

    useEffect(()=>{
        setLoading(true)
        const productosRef = collection(db,'productos')
        const q = categoriaId
                    ?query(productosRef, where ('categoria', '==', categoriaId))
                    :productosRef
        getDocs(q)
            .then((snap)=>{
                const productosDB = snap.docs.map( (doc) => ({id: doc.id, ...doc.data()}) )
                console.log(snap.docs.map( (doc) => ({id: doc.id, ...doc.data()}) )) 
                setProductos(productosDB)
            })
        // pedirDatos()
        // .then( (res) => {
        //     if(!categoriaId){
        //         setProductos(res) 
        //     }else{
        //         setProductos(res.filter((prod)=> prod.categoria === categoriaId))
        //     }
        // })
        .finally(()=>{
            setLoading(false)
        })
    }, [categoriaId])
    

    return(
        <div className="ItemList container">
            { loading 
            ?
            <SpinnerS />
            :
            productos.map( (prod) => <Item producto={prod} key={prod.id}/>)
            }
        </div>
    )
}
export default ItemList