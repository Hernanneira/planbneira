import Item from "../item/Item"
import datos from "../helpers/Datos"
import { useEffect, useState } from "react"
import "./ItemList.css"

const pedirDatos = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            resolve(datos)
            }, 2000);
        })
    }

const ItemList = () => {

const [productos, setProductos] = useState([])

    useEffect(()=>{
        pedirDatos()
        .then( (res) => {
            setProductos(res) 
        })
    }, [])
    

    return(
        <div className="ItemList container">
            {productos.map( (prod) => <Item producto={prod} key={prod.id}/>)}
        </div>
    )
}
export default ItemList