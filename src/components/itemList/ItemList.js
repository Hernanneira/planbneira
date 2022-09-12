import Item from "../item/Item"
import { useEffect, useState } from "react"
import "./ItemList.css"
import pedirDatos from "../helpers/PedirDatos"
import { useParams } from "react-router-dom"
import SpinnerS from "../spinner/spinner"

const ItemList = () => {

const [productos, setProductos] = useState(null)
const [loading, setLoading] = useState(true)
const { categoriaId } = useParams()
console.log(categoriaId)

    useEffect(()=>{
        setLoading(true)
        pedirDatos()
        .then( (res) => {
            if(!categoriaId){
                setProductos(res) 
            }else{
                setProductos(res.filter((prod)=> prod.categoria === categoriaId))
            }
        })
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