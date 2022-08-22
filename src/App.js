import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer';

const App = () => {
  return (
    <div>
    <NavBar/>
    <ItemListContainer greeting="Hola Mundo, estamos en desarrollo" />
    </div>
  );
}

export default App;
