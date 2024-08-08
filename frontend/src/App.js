import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup';
import Private from './Component/Private';
import Login from './Component/Login';
import Addprod from './Component/Addprod';
import Productlist from './Component/Productlist';
import UpdateProd from './Component/UpdateProd';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route path="/" element={<Private />}>
            <Route path="/" element={<Productlist/>} />
            <Route path="/add" element={<Addprod/>} />
            <Route path="/update/:id" element={<UpdateProd/>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile " element={<h1>Profile</h1>} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
