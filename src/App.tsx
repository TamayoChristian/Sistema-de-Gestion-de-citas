import React from 'react';
import './App.css';
import ListarTodo from './components/ListarTodo.tsx';
import Navbar from './components/Navbar.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IngresarDatos from './components/IngresarDatos.tsx';
import DetallesCita from './components/DetallesCita.tsx';

const App = () => {


  return (
    <>
    <div className='navbar'>
    <Navbar/>
    </div>
    <Routes>
      <Route path='/lista' element={<ListarTodo />}></Route>
      <Route path='/ingreso' element={<IngresarDatos/>}></Route>
      <Route path='/detalles' element={<DetallesCita/>}></Route>
    </Routes>
    </>
  )
}

export default App
