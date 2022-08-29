import ItemCount from "./ItemCount"
import ItemList from "./ItemList"

const ItemListContainer = (props) => {

    return(
    <div className='fondo text-center'>
        <h2 className="container text-warning bg-dark border border-warning">
        {props.greeting}
        </h2>
        <ItemCount stock={5} initial={1} />
        <ItemList />
    </div>
  )}
  
export default ItemListContainer