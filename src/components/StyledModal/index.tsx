import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface PopupProps {
  children:React.ReactNode
  open: boolean
  onClose?: ()=>void
}
export default function Popup(props:PopupProps) {
  return (
    <Modal {...props}>
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        // p: 4,
      }}>
        {props.children}
      </Box>
    </Modal>
  )
}