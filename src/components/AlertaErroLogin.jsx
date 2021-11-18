import * as React from 'react';
import { MuiAlert, Snackbar } from '../utils/utils';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({abrirAlerta, setAbrirAlerta, erro}) {

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setAbrirAlerta(false);
   };

   return (
      <>
         <Snackbar open={abrirAlerta} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
               {erro}
            </Alert>
         </Snackbar>
      </>
   );
}