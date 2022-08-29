import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({productos}) => {
    return (
        <div>
            {productos.map( (prod) => {
                return <Card className='card d-inline-flex p-2 text-center border-warning bg-light bg-opacity-50' style={{ width: '18rem' }}key={prod.id}>
                            <Card.Body>
                                <Card.Img variant="top" src={prod.pictureUrl}/>
                                <Card.Title>{prod.title}</Card.Title>
                                <Card.Text>{prod.description}</Card.Text>
                                <Button variant="outline-warning btn-sm" >Ver detalles</Button>
                            </Card.Body>
                        </Card>
            })
            }
        </div>
    );
}

export default Item