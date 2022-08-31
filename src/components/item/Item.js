import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({producto}) => {
    return (
        <div className=''>
            <Card className='card  d-inline-flex p-2 text-center border-warning bg-light bg-opacity-50' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Img variant="top" src={producto.pictureUrl}/>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text>{producto.description}</Card.Text>
                    <Card.Text>${producto.price}</Card.Text>
                    <Button variant="outline-warning btn-sm" >Ver detalles</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Item