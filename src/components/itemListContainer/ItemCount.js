
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const ItemCount = (props) => {

    const [counter,setCounter] = useState(props.initial)

    const sumar = () => {
        if (counter < props.stock) {
          setCounter (counter + 1)   
        }
    }

    const restar = () => {
        if(counter > 1){
            setCounter(counter - 1)
        }
        
    }

    return (
        <div>
            <Card style={{ width: '8rem',}}>
                <Card.Body>
                    <Card.Title>Contador</Card.Title>
                    <Button onClick={sumar} variant="outline-warning btn-sm">+</Button>
                    <span className='mx-2'>{counter}</span>
                    <Button onClick={restar} variant="outline-warning btn-sm" >-</Button>
                </Card.Body>
            </Card>
        </div>
        
    )
}

export default ItemCount