import Item from "../item/Item"
import { useEffect, useState } from "react"
import "./ItemList.css"
import pedirDatos from "../helpers/PedirDatos"
import { useParams } from "react-router-dom"
import SpinnerS from "../spinner/spinner"

const ItemList = () => {

const [productos, setProductos] = useState(null)
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
            { productos 
            ?
                productos.map( (prod) => <Item producto={prod} key={prod.id}/>)
            :
            <SpinnerS />
            }
        </div>
    )
}
export default ItemList