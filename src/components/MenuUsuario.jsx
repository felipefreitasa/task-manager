import React, { useState } from 'react'
import '../styles/MenuUsuario.scss'
import { auth, Button, Menu, MenuItem } from '../utils/utils'

const MenuUsuario = ({ usuarioLogado }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const singUp = () => {
      handleClose()
      auth.signOut();
   };

   return (
      <div className="menu-usuario">
         <Button
            variant="text"
            disableElevation
            onClick={handleClick}
         >
            <span class="material-icons">account_circle</span>
            <p>{usuarioLogado.email}</p>
            <span class="material-icons">expand_more </span>
         </Button>
         <Menu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={singUp} sx={{ fontSize: '14px', color: '#00072d' }}>
               <span class="material-icons">
                  logout
               </span>
               <p>SAIR</p>
            </MenuItem>
         </Menu>
      </div>
   )
}

export default MenuUsuario
