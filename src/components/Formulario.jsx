import React from 'react'
import '../styles/Formulario.scss'
import { Tooltip, Button, TextField, Select, MenuItem } from '../utils/utils'

const Formulario = (
   {
      atividadeId,
      setAtualizarAtividade,
      criarAtividade,
      titulo,
      descricao,
      responsavel,
      responsaveis,
      status,
      onChangeArquivo,
      onChangeTitulo,
      onChangeDescricao,
      onChangeResponsavel,
      onChangeStatus,

   }
) => {

   return (
      <div className="formulario-container">
         <h2>{atividadeId ? "ATUALIZAR" : "ADICIONAR"} ATIVIDADE</h2>
         <form onSubmit={atividadeId ? setAtualizarAtividade : criarAtividade} className="formulario-atividade">
            <label>
               <input
                  required
                  accept=".pdf, .txt"
                  type="file"
                  disabled={atividadeId}
                  onChange={onChangeArquivo}
               />
               <Tooltip title="Adicionar documento" arrow placement="top">
                  <Button
                     disabled={atividadeId}
                     variant="contained"
                     component="span"
                     className="botao-formulario"
                  >
                     <span class="material-icons">upload_file</span>
                  </Button>
               </Tooltip>
            </label>

            <TextField
               required
               disabled={atividadeId}
               className="formulario-atividade-input"
               size="small"
               label="Título"
               variant="outlined"
               value={titulo}
               onChange={onChangeTitulo}
            />
            <TextField
               required
               disabled={atividadeId}
               className="formulario-atividade-input"
               size="small"
               label="Descrição"
               variant="outlined"
               value={descricao}
               onChange={onChangeDescricao}
            />

            <Select
               required
               size="small"
               className="formulario-atividade-input"
               value={responsavel}
               label="Status"
               onChange={onChangeResponsavel}
               >
               {responsaveis.map((res) => {
                  return (
                     <MenuItem value={res}>{res}</MenuItem>
                  )
               })}
            </Select>

            <Select
               required
               size="small"
               className="formulario-atividade-input"
               value={status}
               label="Status"
               onChange={onChangeStatus}
            >
               <MenuItem value="Pendente">Pendente</MenuItem>
               <MenuItem value="Andamento">Andamento</MenuItem>
               <MenuItem value="Finalizada">Finalizada</MenuItem>
               <MenuItem value="Cancelada">Cancelada</MenuItem>
            </Select>

            <Button variant="contained" type="submit" className="botao-formulario"
            >{atividadeId ? "Atualizar" : "Adicionar"}</Button >
         </form>
      </div>
   )
}

export default Formulario
