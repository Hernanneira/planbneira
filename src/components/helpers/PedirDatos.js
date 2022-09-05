import datos from "./Datos";

const pedirDatos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(datos)
        }, 2000);
    })
}

export default pedirDatos