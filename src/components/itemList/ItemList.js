import Item from "../item/Item"
import "./ItemList.css"


const ItemList = ({produc}) => {


    return(
        <div className="ItemList container">
            {
            produc.map( (prod) => <Item producto={prod} key={prod.id}/>)
            }
        </div>
    )
}
export default ItemList