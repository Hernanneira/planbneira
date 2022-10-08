// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';


// const FormExample = () => {
//     const [validated, setValidated] = useState(false);
//     const [values, setValues] = useState({
//         nombre:'',
//         apellido:'',
//         email:'',
//         direccion:'',
//         telefono:'',
// })

// const handleInputChange = (e) => {
//     setValues({
//         ...values,
//         [e.target.name]: e.target.value
//     })
// }

//     const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
        
//     } 
//     setValidated(true);
//     event.preventDefault();



//     // const formCheck = () => {
//     //     if (values.email.length < 3) {
//     //         dato = false
//     //     }
//     // }

//     };


//     return (
//     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//             <Form.Label>Primer nombre</Form.Label>
//             <Form.Control
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//                 name="nombre"
//                 placeholder="Primer nombre"
//         />
//         <Form.Control.Feedback>Correcto</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//             <Form.Label>Apellido</Form.Label>
//             <Form.Control
//                 onChange={handleInputChange}
//                 required
//                 type="text"
//                 name="apellido"
//                 placeholder="Apellido"
//         />
//         <Form.Control.Feedback type="invalid">Invalido</Form.Control.Feedback>
//         <Form.Control.Feedback>Valido</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//             <Form.Label>Email</Form.Label>
//             <InputGroup hasValidation>
//             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                 <Form.Control
//                     onChange={handleInputChange}
//                     type="email"
//                     placeholder="Email"
//                     name="email"
//                     aria-describedby="inputGroupPrepend"
//                     required
//                 />
//                 <Form.Control.Feedback type="invalid">Invalido</Form.Control.Feedback>
//                 <Form.Control.Feedback>Valido</Form.Control.Feedback>
//             </InputGroup>
//         </Form.Group>
//         </Row>
//         <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom03">
//             <Form.Label>direccion</Form.Label>
//             <Form.Control
//                 onChange={handleInputChange}
//                 type="text"
//                 name="direccion"
//                 placeholder="City" 
//                 required 
//                 />
//             <Form.Control.Feedback type="invalid">Invalido</Form.Control.Feedback>
//             <Form.Control.Feedback>Valido</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="3" controlId="validationCustom04">
//             <Form.Label>telefono</Form.Label>
//             <Form.Control
//                 onChange={handleInputChange}
//                 type="number"
//                 name="telefono" 
//                 placeholder="telefono" 
//                 required />
//             <Form.Control.Feedback type="invalid">Invalido</Form.Control.Feedback>
//             <Form.Control.Feedback>Valido</Form.Control.Feedback>
//         </Form.Group>
//         </Row>
//         <Form.Group className="mb-3">
//             <Form.Check
//                 required
//                 label="Acepto los terminos y condiciones de planb"
//                 feedback="Debes aceptar antes de continuar."
//                 feedbackType="invalid"
//         />
//         </Form.Group>
//         <Button variant='success' type="submit">Terminar</Button>
//     </Form>
//     );
// }

// export default FormExample

