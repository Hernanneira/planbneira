import Item from "../item/Item"
import { useEffect, useState } from "react"
import "./ItemList.css"
import pedirDatos from "../helpers/PedirDatos"
import { useParams } from "react-router-dom"

const ItemList = () => {

const [productos, setProductos] = useState([])
const { categoriaId } = useParams()
console.log(categoriaId)

    useEffect(()=>{
        pedirDatos()
        .then( (res) => {
            if(!categoriaId){
                setProductos(res) 
            }else{
                setProductos(res.filter((prod)=> prod.categoria === categoriaId))
            }

        })
    }, [categoriaId])
    

    return(
        <div className="ItemList container">
            {productos.map( (prod) => <Item producto={prod} key={prod.id}/>)}
        </div>
    )
}
export default ItemList