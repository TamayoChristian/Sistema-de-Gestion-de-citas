import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <header>
            <nav>
                <Link to="/lista">LIsta</Link>
                <Link to="/ingreso">INgreso</Link>
                <Link to={"/detalles"}>CIta detallada</Link>
                </nav> 
        </header> 
    )
}
export default Navbar