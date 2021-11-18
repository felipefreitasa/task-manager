import React, { useState } from "react";
import '../styles/Login.scss'
import { auth, store, useHistory, TextField, Button } from '../utils/utils'
import LoginImagem from '../assets/svg/login.svg'
import AlertaErroLogin from '../components/AlertaErroLogin'

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [criandoConta, setCriandoConta] = useState(false)
  const [erro, setErro] = useState('')
  const [abrirAlerta, setAbrirAlerta] = useState(false);

  async function enviandoFormulario(e) {
    e.preventDefault()

    if (criandoConta) {
      try {
        await auth.createUserWithEmailAndPassword(email, senha)
          .then((cred) => {
            store.collection("usuarios").doc(cred.user.uid).set({
              email
            })
          })
          .then(() => { history.push("/") })
      } catch (e) {
        switch (e.code) {
          case "auth/email-already-in-use":
            setErro("Esse e-mail já está sendo usado...");
            setAbrirAlerta(true);
            break;
          case "auth/invalid-email":
            setErro("E-mail inválido...");
            setAbrirAlerta(true);
            break;
          case "auth/weak-password":
            setErro("Sua senha deve possuir pelo menos 6 caracteres...");
            setAbrirAlerta(true);
            break;
          default:
            setErro("Erro inesperado...");
            setAbrirAlerta(true);
        }
      }
    } else {
      try {
        await auth.signInWithEmailAndPassword(email, senha).then(() => { history.push("/") })
      } catch (e) {
        switch (e.code) {
          case "auth/wrong-password":
            setErro("Ops, sua senha está incorreta...");
            setAbrirAlerta(true);
            break;
          case "auth/user-not-found":
            setErro("Esse usuário não existe...");
            setAbrirAlerta(true);
            break;
          default:
            setErro("Erro inesperado...");
            setAbrirAlerta(true);
        }
      }
    }
  }

  return (
    <section className="login">
      <form onSubmit={enviandoFormulario}>
        <div className="login-formulario">
          <h1>{criandoConta ? 'CRIAR CONTA' : 'ENTRAR'}</h1>
          <p>{criandoConta ? 'Crie uma conta para continuar...' : 'Faça seu login para continuar...'}</p>
          <TextField
            size="small"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />
          <TextField
            type="password"
            size="small"
            label="Senha"
            variant="outlined"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="login-input"
          />
          <Button type="submit" variant="contained">
            {
              criandoConta ?
                'Criar conta'
                :
                'Entrar'
            }
          </Button>

          {criandoConta ?
            <p>Já possui conta? <span onClick={() => setCriandoConta(false)}>Entrar</span></p>
            :
            <p>Não possui conta? <span onClick={() => setCriandoConta(true)}>Criar</span></p>
          }

          <AlertaErroLogin abrirAlerta={abrirAlerta} setAbrirAlerta={setAbrirAlerta} erro={erro} />
        </div>
      </form>

      <div className="login-illustration">
        <img src={LoginImagem} alt="Homem analisando o status dos servidores de uma empresa" />
      </div>
    </section>
  );
};

export default Login
