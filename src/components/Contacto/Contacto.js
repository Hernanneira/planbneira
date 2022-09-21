import "./Contacto.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const contacto = (e) => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="contacto">
        <h2 className="titulos">Contacto</h2>
        <Form onSubmit={handleSubmit} className="container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su email" />
            <Form.Text className="text-muted">
                No compartiremos sus datos con nadie.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Constraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="success" type="submit">
            Enviar
            </Button>
        </Form>
        <div className="maps">
        <h2>Podes encontrarnos en</h2>
        <iframe title="Map" width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=rojas%20901%20capital%20federal&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
        </div>
    );
}
export default contacto;