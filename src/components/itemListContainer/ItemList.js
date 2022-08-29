import Item from "./Item"
import datos from "./Datos"
import { useEffect, useState } from "react"

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
        <div>
            <Item productos={productos}/>
        </div>
    )
}
export default ItemList