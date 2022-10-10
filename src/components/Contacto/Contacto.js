import "./Contacto.css"
import ContactForm from "../Form/ContactForm";

const contacto = (e) => {

    return (
        <div className="contacto">
        <h2 className="titulos">Contacto</h2>
        <div className="container my-5">
            <ContactForm/> 
        </div>
        
        <div className="maps">
        <h2>Podes encontrarnos en</h2>
        <iframe title="Map" width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=rojas%20901%20capital%20federal&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
        </div>
    );
}
export default contacto;