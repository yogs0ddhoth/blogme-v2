import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import PostForm from '../PostForm';

import { authContext } from '../../utils/context/contexts';
import { Post } from 'custom-types';
import DeleteCard from '../Delete';

export default function PostMenu({post}:{post:Post}) {
  const {state, dispatch} = React.useContext(authContext);
  // Menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Edit action state
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  // Delete action state
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <>
      <IconButton
        id="button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu id="menu" 
        anchorEl={anchorEl} open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'button'}}
      >
        <MenuItem 
          onClick={() => {
            handleClose();
            handleEditOpen();
          }}
        >
          <ListItemIcon>
            <EditOutlined fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem 
          onClick={() => {
            handleClose();
            handleDeleteOpen();
          }}
        >
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

      </Menu>

      <Modal open={editOpen}>
        <PostForm post={post}
          action={
            <IconButton onClick={handleEditClose}>
              <ClearOutlinedIcon/>
            </IconButton>
          }
        />
      </Modal>
      <Modal open={deleteOpen} onClose={handleDeleteClose}>
        <DeleteCard id={post.id as number}
          action={
            <IconButton onClick={handleDeleteClose}>
              <ClearOutlinedIcon/>
            </IconButton>
          }
          cancel={handleDeleteClose}
        />
      </Modal>
    </>
  );
}