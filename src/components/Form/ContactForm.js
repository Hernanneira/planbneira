import { useForm } from "../../CartContext/useForm";


const ContactForm = () => {
    const {form, errors, handleChange, handleBlur,handleSubmit,} = useForm({
        nombre:'',
        email:'',
        comentarios:'',
    })

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