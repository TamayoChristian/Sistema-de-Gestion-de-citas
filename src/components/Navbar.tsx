import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
const Navbar = () => {
    return (
        <div className="navbar">
        <header>
            <h1>CITAS MEDICAS</h1>
            <nav>
                <Link to="/lista" className="botonesNav">Listado de todas las citas</Link>
                <Link to="/ingreso" className="botonesNav">Ingreso de nuevas citas</Link>
                <Link to={"/detalles"} className="botonesNav">Ver detalles de una cita</Link>
                </nav> 
        </header>
        </div> 
    )
}
export default Navbar