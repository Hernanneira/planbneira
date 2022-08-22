
const ItemListContainer = (props) => {
    console.log(props)

    return(
    <div className='fondo'>
        <h2 className="container text-warning bg-dark border border-warning">
        {props.greeting}
        </h2>
    </div>
  )}
  
export default ItemListContainer