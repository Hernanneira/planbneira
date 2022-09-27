import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CartProvider from './CartContext/CartContext';
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import Contacto from "./components/Contacto/Contacto"
import Checkout from './components/checkout/checkout';

const App = () => {

  

  return (
    
    <CartProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={< ItemListContainer />} />
          <Route path="/productos/:categoriaId" element={<ItemListContainer />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path='/Item/:itemId' element={<ItemDetailContainer />}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="*" element={ <Navigate to="/"/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </CartProvider>
      
    
    
    
    
    
  );
}

export default App;
