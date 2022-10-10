import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'

const Item = ({producto}) => {
    return (
        <div>
            <Card className='card  d-inline-flex p-2 text-center border-warning bg-light bg-opacity-50' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Img variant="top" src={producto.pictureUrl}/>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text>{producto.description}</Card.Text>
                    <Card.Text>${producto.price}</Card.Text>
                    <Link to={`/item/${producto.id}`} className = "btn btn-outline-warning" >Ver detalles</Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Item