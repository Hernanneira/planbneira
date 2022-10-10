import { useForm } from "../../CartContext/useForm";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useContext} from "react";
import { CartContext } from "../../CartContext/CartContext"


const ContactForm = () => {
    const {form, errors, setErrors, handleChange, handleBlur, validationForm} = useForm({
        nombre:'',
        email:'',
        comentarios:'',
    })
    const {exito, fracaso} = useContext(CartContext)
    const forms = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault()
        setErrors(validationForm(form))

        if((Object.keys(errors).length !== 0) || (form.nombre.length === 0)) {
            fracaso()
        }else{
            exito()
            emailjs.sendForm('service_rwrjtin', 'template_7pq46ue', forms.current, 'L4YjW4p_asDZLLWyw')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
    }

    return (
        <div>
            <form ref={forms}>
                <input
                className="form-control my-3"
                type="text"
                name="nombre"
                placeholder="escribe tu nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.nombre}
                required
                />
                {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                <input
                className="form-control my-3"
                type="email"
                name="email"
                placeholder="escribe tu email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.email}
                required
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
                <textarea
                className="form-control my-3"
                name="comentarios" 
                cols="50" 
                rows="5" 
                placeholder="escribe algun comentario" 
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.comentarios}
                >
                </textarea>
                {errors.comentarios && <p className="text-danger">{errors.comentarios}</p>}
                <input type="submit" value="enviar" onClick={handleSubmit} className="btn btn-success"></input>
            </form>
        </div>
    )
}

export default ContactForm