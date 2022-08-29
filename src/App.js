import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';

const App = () => {
  return (
    <div>
    <NavBar/>
    <ItemListContainer greeting="Productos" />
    </div>
  );
}

export default App;
