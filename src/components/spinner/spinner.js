import Spinner from 'react-bootstrap/Spinner';
import "./spinner.css"

const SpinnerS = () => {
  return (
    <div className = "fondo">
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
    
  );
}

export default SpinnerS;