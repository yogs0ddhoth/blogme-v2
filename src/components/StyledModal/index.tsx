import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface PopupProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}
export default function Popup(props: PopupProps) {
  return (
    <Modal {...props}>
      <Box
        className="styled-modal"
        sx={{
          bgcolor: 'background.paper',
        }}
      >
        {props.children}
      </Box>
    </Modal>
  );
}
