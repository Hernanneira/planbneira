import { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import pedirDatos from "../helpers/PedirDatos";


const ItemDetailContainer = () => {

const [item, setitem] = useState([])
const {itemId} = useParams()

useEffect( () => {
    pedirDatos()
        .then( (res) => {
            setitem(res.find((prod) => prod.id === Number(itemId))) 
        })
        .catch (err => console.log(err))
}, [])

return(
    <div>
        <ItemDetail item={item} />
    </div>
)
}

export default ItemDetailContainer