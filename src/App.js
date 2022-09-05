import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';


const App = () => {
  return (
    <BrowserRouter>

      <NavBar/>

      <Routes>
        <Route path="/" element={< ItemListContainer />} />
        <Route path="/productos/:categoriaId" element={< ItemListContainer />} />
        <Route path="/contacto" element={<h2>Contacto</h2>} />
        <Route path='/Item/:itemId' element={<ItemDetailContainer />}/>
        <Route path="*" element={ <Navigate to="/"/>} />
      </Routes>
      
    </BrowserRouter>
    
    
    
  );
}

export default App;
