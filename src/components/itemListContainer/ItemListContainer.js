import { useParams } from "react-router-dom"
import ItemList from "../itemList/ItemList"
import "./ItemListContainer.css"


const ItemListContainer = () => {


    return(
    <div className='fondo text-center'>
        <h2 className="container text-warning bg-dark border border-warning">
          Productos
        </h2>
        <ItemList />
    </div>
  )}
  
export default ItemListContainer