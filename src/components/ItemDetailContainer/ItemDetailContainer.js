import { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
// import pedirDatos from "../helpers/PedirDatos";
import SpinnerS from "../spinner/spinner";
import { getDoc, doc } from "firebase/firestore";
import {db} from "../../firebase/config"


const ItemDetailContainer = () => {

const [item, setitem] = useState(null)
const {itemId} = useParams()

useEffect( () => {
    const docRef = doc(db, 'productos', itemId)

    getDoc(docRef)
        .then((resp)=>{
            setitem({id: resp.id, ...resp.data()})
        })
    // pedirDatos()
    //     .then( (res) => {
    //         setitem(res.find((prod) => prod.id === Number(itemId))) 
    //     })
    //     .catch (err => console.log(err))

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