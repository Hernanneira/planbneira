import { useState} from "react";
// import { useState, useContext} from "react";
// import { CartContext } from "../CartContext/CartContext"

export const useForm = (init) => {
    // const {exito, fracaso} = useContext(CartContext)
    const [form,setForm] = useState(init)
    const [errors,setErrors] = useState({});

    const validationForm = () => {
        let errors = {}
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        let regexComments = /^.{0,255}$/;
    
        if (!form.nombre.trim()){
            errors.nombre = "el campo nombre es requerido."
        } else if (!regexName.test(form.nombre.trim())){
            errors.nombre = "el campo nombre solo acepta letras y espacios en blanco."
        } else if (form.nombre.length < 3) {
            errors.nombre = "el nombre debe tener mas de 3 caracteres"
        }
    
        if (!form.email.trim()){
            errors.email = "el campo email es requerido."
        } else if (!regexEmail.test(form.email.trim())){
            errors.email = "el campo email ses incorrecto."
        }
    
        if(!regexComments.test(form.comentarios.trim())){
            errors.comentarios = "el campo comentarios no debe exceder los 255 caracteres."
        }
        return errors
    }

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value})
    }
    const handleBlur = (e) =>{
        handleChange(e)
        setErrors(validationForm(form))
    }

    // const handleSubmit = (e) =>{
    //     e.preventDefault()
    //     setErrors(validationForm(form))

    //     if((Object.keys(errors).length !== 0) || (form.nombre.length === 0)) {
    //         fracaso()
    //     }else{
    //         exito()
    //     }
    // }

    return {
        form,
        errors,
        setErrors,
        handleChange,
        handleBlur,
        // handleSubmit,
        validationForm,
    }
}
