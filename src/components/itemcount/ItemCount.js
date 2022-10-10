import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ItemCount = ({stock, counter, setCounter, handleAdd, price}) => {

    const sumar = () => {
        if (counter < stock) {
            setCounter (counter + 1)   
        }
    }

    const restar = () => {
        if(counter > 1){
            setCounter(counter - 1)
        }
        
    }

    return (
        <div className="text-dark">
            <Card >
                <Card.Body>
                    <Card.Title>Cantidad</Card.Title>
                    <Button onClick={restar} variant={`${counter === 1 ? "outline-danger" : "outline-warning "} btn-sm`} >-</Button>
                    <span className='mx-2'>{counter}</span>
                    <Button onClick={sumar} variant={`${counter === stock ? "outline-danger" : "outline-warning "} btn-sm`}>+</Button>
                    <Card.Text> Precio total : $ {counter * price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Stock: {stock}</Card.Footer>
            </Card>
            <Button onClick={handleAdd} variant ="outline-success">Agregar al carrito</Button>

        </div>
        
    )
}

export default ItemCount