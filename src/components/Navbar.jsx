import React from "react";
import '../styles/Navbar.scss'
import MenuUsuario from "./MenuUsuario";
import LogoFelipe from '../assets/images/logo-felipe.png'

const Navbar = ({ usuarioLogado }) => {
  return (
    <header className="navbar">
      <div>
        <img src={LogoFelipe} alt="Logo Felipe Freitas" />
        {
          usuarioLogado ?
            <MenuUsuario usuarioLogado={usuarioLogado} />
            :
            null
        }
      </div>

    </header>
  );
};

export default Navbar

