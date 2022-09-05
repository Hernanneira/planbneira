import './ItemDetail.css'
import ItemCount from "../itemcount/ItemCount"


const ItemDetail = ({item}) => {
    return (
        <div className='fondo'>
            {   <div className='container d-inline-flex detalle'>
                    <img className="imgDetail img-fluid" src={item.pictureUrl} alt="Img"/>
                    <div className='text-white'>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <ItemCount stock={5} initial={1} />
                    </div>
                    
                </div>
            }
        </div>
    );
}

export default ItemDetail