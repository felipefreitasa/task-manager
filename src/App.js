import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Atividades from './pages/Atividades'
import Login from './pages/Login'
import './styles/App.scss'
import firebase from './services/firebaseConfig'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  firebase.auth().onAuthStateChanged((usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuarioLogado(usuarioFirebase)
    } else {
      setUsuarioLogado(null)
    }
  });

  return (
    <div className="container" >
      <Router>
        <Switch>
          {usuarioLogado ?
            <Route exact path="/">
              <Atividades emailUsuario={usuarioLogado.email} usuarioLogado={usuarioLogado}/>
            </Route>
            :
            <Route path="/" component={Login} />
          }
        </Switch>
      </Router>

    </div>
  );
}

export default App;
