import React from 'react';
import './App.css';
import ListarTodo from './components/ListarTodo.tsx';
import Navbar from './components/Navbar.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/lista' element={<ListarTodo />}></Route>
    </Routes>
    </>
  )
}

export default App
