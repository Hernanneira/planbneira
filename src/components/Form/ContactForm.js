import { useForm } from "../../CartContext/useForm";

const initialForm = {
    nombre:'',
    direccion:'',
    email:'',
    telefono:'',
    comentarios:'',
}
const validationForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{0,255}$/;

    if (!form.nombre.trim()){
        errors.nombre = "el campo nombre es requerido."
    } else if (!regexName.test(form.nombre.trim())){
        errors.nombre = "el campo nombre solo acepta letras y espacios en blanco."
    } else if (form.nombre.length < 3) {
        errors.nombre = "el nombre debe tener mas de 3 caracteres"
    }
    
    if (!form.direccion.trim()){
        errors.direccion = "el campo direccion es requerido."
    } else if (form.direccion.length < 3) {
        errors.direccion = "La direccion debe tener mas de 3 caracteres"
    }

    if (!form.email.trim()){
        errors.email = "el campo email es requerido."
    } else if (!regexEmail.test(form.email.trim())){
        errors.email = "el campo email ses incorrecto."
    }

    if (!form.telefono.trim()){
        errors.telefono = "el campo telefono es requerido."
    } else if (form.telefono.length < 7) {
        errors.telefono = "La telefono debe tener mas de 7 numeros"
    }

    if(!regexComments.test(form.comentarios.trim())){
        errors.comentarios = "el campo comentarios no debe exceder los 255 caracteres."
    }
    return errors
}

const ContactForm = () => {
    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,} = useForm(initialForm,validationForm)
    return (
        <div>
            <form>
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
                type="text"
                name="direccion"
                placeholder="escribe tu direccion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.direccion}
                required
                />
                {errors.direccion && <p className="text-danger">{errors.direccion}</p>}
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
                <input
                className="form-control my-3"
                type="number"
                name="telefono"
                placeholder="escribe tu telefono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.telefono}
                required
                />
                {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
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