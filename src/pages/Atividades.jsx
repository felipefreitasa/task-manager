import React, { useState, useEffect } from "react";
import '../styles/Atividades.scss'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, fire, store } from '../utils/utils'
import Atividade from "../components/Atividade";
import Formulario from "../components/Formulario";
import Navbar from "../components/Navbar";

const Atividades = ({ emailUsuario, usuarioLogado }) => {
  var arquivoCarregadoLink
  const [atividades, setAtividades] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState(emailUsuario);
  const [status, setStatus] = useState("Pendente");
  const [atividadeId, setAtividadeId] = useState(null);
  const [arquivoCarregado, setArquivoCarregado] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [responsaveis, setResponsaveis] = useState([])
  const [historicoStatus, setHistoricoStatus] = useState('')
  const [historicoResponsavel, setHistoricoResponsavel] = useState('')
  const [data, setData] = useState('')

  const carregarAtividades = async () => {
    setCarregando(true)

    const atividadesFirebase = store.collection("atividades");
    const { docs } = await atividadesFirebase.where("emailUsuario", "==", emailUsuario).get();
    const atividadesArray = docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setAtividades(atividadesArray);
    setCarregando(false)
  };

  const carregarArquivo = async () => {
    const storageRef = fire.storage().ref();
    const arquivoPath = storageRef.child(arquivoCarregado.name);
    await arquivoPath.put(arquivoCarregado);
    arquivoCarregadoLink = await arquivoPath.getDownloadURL();
  }

  const criarAtividade = async (e) => {
    e.preventDefault();
    setCarregando(true)

    await carregarArquivo()
    const dadosAtividade = { emailUsuario, titulo, descricao, responsavel, status, url: arquivoCarregadoLink, historicoStatus, historicoResponsavel, data };
    await store.collection("atividades").add(dadosAtividade);
    await carregarAtividades();

    setTitulo("");
    setDescricao("");
    setResponsavel(emailUsuario)
    setArquivoCarregado(null)
    setCarregando(false)
    setHistoricoStatus('')
    setHistoricoResponsavel('')
  };

  const apagarAtividade = async (id) => {
    await store.collection("atividades").doc(id).delete();
    await carregarAtividades();
  };

  const atualizarAtividade = async (id) => {
    const dadosAtividade = await store.collection("atividades").doc(id).get();
    const { titulo, descricao, responsavel, status } = dadosAtividade.data();

    const date = new Date()
    const dia = date.getDate()
    const mes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const ano = date.getFullYear()
    const dataCompleta = `${dia}/${mes[(date.getMonth())]}/${ano}`

    const hora = date.getHours()
    const minutos = date.getMinutes()
    const segundos = date.getSeconds()
    const horaCompleta = `${hora}:${minutos}:${segundos}`

    setData(`${dataCompleta} - ${horaCompleta}`)
    setTitulo(titulo);
    setDescricao(descricao);
    setAtividadeId(dadosAtividade.id);
    setResponsavel(responsavel);
    setHistoricoStatus(status)
    setHistoricoResponsavel(responsavel)
  };

  const setAtualizarAtividade = async (e) => {
    e.preventDefault();
    await store.collection("atividades").doc(atividadeId).update({ titulo, descricao, responsavel, status, historicoStatus, historicoResponsavel, data });
    await carregarAtividades()

    setAtividadeId(null);
    setDescricao("");
    setTitulo("");
    setResponsavel(emailUsuario)
    setHistoricoStatus(status)
    setHistoricoResponsavel(responsavel)
  };

  const carregarTodosEmails = async () => {
    let emails = []
    await store.collection("usuarios").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const email = (doc.id, " => ", doc.data().email)
          emails.push(email);
        });
      })
    setResponsaveis(emails)
  }

  useEffect(() => {
    const atividadesUsuario = async () => {
      await carregarAtividades();
    }
    carregarTodosEmails()
    atividadesUsuario();
  }, [])

  return (
    <main className="main">
      <Navbar  usuarioLogado={usuarioLogado}/>

      <Formulario
        atividadeId={atividadeId}
        setAtualizarAtividade={setAtualizarAtividade}
        criarAtividade={criarAtividade}
        titulo={titulo}
        descricao={descricao}
        responsavel={responsavel}
        responsaveis={responsaveis}
        status={status}
        onChangeArquivo={e => setArquivoCarregado(e.target.files[0])}
        onChangeTitulo={(e) => { setTitulo(e.target.value) }}
        onChangeDescricao={(e) => { setDescricao(e.target.value) }}
        onChangeResponsavel={e => setResponsavel(e.target.value)}
        onChangeStatus={e => setStatus(e.target.value)}
      />

      <div className="tabela-container">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} className="tabela">
            <TableHead>
              <TableRow>
                <TableCell align="center">ATIVIDADE</TableCell>
                <TableCell align="center">RESPONSÁVEL</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="right">DETALHES</TableCell>
                <TableCell align="right">EDITAR</TableCell>
                <TableCell align="right">DELETAR</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {atividades.map((atividade) => (
                <Atividade
                  atividade={atividade}
                  onClickAtualizar={(id) => { atualizarAtividade(atividade.id) }}
                  onClickApagar={(id) => { apagarAtividade(atividade.id) }}
                />
              ))}
            </TableBody>
          </Table>
          {carregando ? <LinearProgress className="linear-progress" /> : null}
        </TableContainer>
      </div>

    </main >
  );
};

export default Atividades