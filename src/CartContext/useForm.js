import { useState, useContext } from "react";
import { CartContext } from "../CartContext/CartContext"

export const useForm = (initialForm, validateForm) => {
    const {exito, fracaso} = useContext(CartContext)
    const [form,setForm] = useState(initialForm);
    const [errors,setErrors] = useState({});

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value})
    }
    const handleBlur = (e) =>{
        handleChange(e)
        setErrors(validateForm(form))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setErrors(validateForm(form))

        if((Object.keys(errors).length !== 0) || (form.nombre.length === 0)) {
            fracaso()
        }else{
            exito()
        }
    }

    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}
