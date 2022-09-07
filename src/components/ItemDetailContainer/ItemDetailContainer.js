import { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import pedirDatos from "../helpers/PedirDatos";
import SpinnerS from "../spinner/spinner";


const ItemDetailContainer = () => {

const [item, setitem] = useState(null)
const {itemId} = useParams()

useEffect( () => {
    pedirDatos()
        .then( (res) => {
            setitem(res.find((prod) => prod.id === Number(itemId))) 
        })
        .catch (err => console.log(err))
}, [itemId])

return(
    <div>
        { item
        ?
            <ItemDetail item={item} />
        :
            <SpinnerS />
        }
    </div>
)
}

export default ItemDetailContainer