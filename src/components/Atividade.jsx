import React from 'react'
import '../styles/Atividade.scss'
import {TableRow, TableCell, Button} from '../utils/utils'
import ModalAtividadeDetalhes from './ModalAtividadeDetalhes'

const Atividade = ({ atividade, onClickApagar, onClickAtualizar }) => {
   return (
      <TableRow sx={{background: '#fefefe'}}>

         <TableCell align="center">{atividade.titulo}</TableCell>

         <TableCell align="center">{atividade.responsavel}</TableCell>

         <TableCell align="center" sx={{ width: 60 }}><p className={`status-atividade ${atividade.status}`}>{atividade.status}</p></TableCell>

         <TableCell align="right">
            <ModalAtividadeDetalhes
               titulo={atividade.titulo}
               descricao={atividade.descricao}
               responsavel={atividade.responsavel}
               status={atividade.status}
               arquivo={atividade.url}
               historicoStatus={atividade.historicoStatus}
               historicoResponsavel={atividade.historicoResponsavel}
               data={atividade.data}
            />
         </TableCell>

         <TableCell align="right">
            <Button onClick={onClickAtualizar} color="success">
               <span class="material-icons">edit</span>
            </Button>
         </TableCell>

         <TableCell align="right">
            <Button onClick={onClickApagar} color="error">
               <span class="material-icons">delete</span>
            </Button>
         </TableCell>

      </TableRow>
   )
}

export default Atividade
