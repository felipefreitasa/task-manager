import React, { useState } from 'react';
import '../styles/ModalAtividadeDetalhes.scss'
import { Box, Button, Modal } from '../utils/utils'

export default function BasicModal({ arquivo, titulo, descricao, status, responsavel, historicoStatus, historicoResponsavel, data }) {
  const [open, setOpen] = useState(false);

  const abrirModal = () => setOpen(true);
  const fecharModal = () => setOpen(false);

  return (
    <div>
      <Button onClick={abrirModal}>
        <span class="material-icons">visibility</span>
      </Button>
      <Modal
        open={open}
        onClose={fecharModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="atividade-detalhe-modal">
          <div>
            <strong>Titulo</strong>
            <p>{titulo}</p>
          </div>

          <div>
            <strong>Descrição</strong>
            <p>{descricao}</p>
          </div>

          <div>
            <strong>Responsável</strong>
            <p>{responsavel}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{status}</p>
          </div>

          <a href={arquivo} target="_blank" rel="noreferrer" className="visualizar-documento-botao">
            <Button variant="contained">
              <span class="material-icons">
                attach_file
              </span>
              visualizar documento
            </Button>
          </a>
        </Box>
      </Modal>
    </div >
  );
}