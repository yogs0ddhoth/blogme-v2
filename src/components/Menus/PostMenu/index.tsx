import * as React from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CloseButton } from '../../Buttons';
import DeleteCard from '../../Delete';
import PostForm from '../../Forms/PostForm';

import { authContext } from '../../../utils/context/contexts';
import { Post } from 'custom-types';
import { ActionsMenu, MenuAction, Popup } from '..';
import useControllers from '../../../utils/api';
import { useTheme } from '@mui/material';

export default function PostMenu({ post, darkMode }: { post: Post, darkMode: boolean }) {
  const { deletePost, updatePost } = useControllers();
  const { state, dispatch } = React.useContext(authContext);
  const {auth} = state;
  const {id} = post;

  // Edit action state
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  
  // TODO: create seperate handler to initialize mutation with auth checked for expiration
  const useUpdatePost = updatePost.init(auth, id);
  const useDeletePost = deletePost.init(auth, id);
  
  // Delete action state
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <ActionsMenu 
      // sx={{'&:hover': {color: darkMode ? 'secondary.main' : 'primary.dark'}}}
      className={`hover:text-[${darkMode ?'#69f0ae' : '#171717'}]`}
      icon={
        <MoreVertIcon />
      }
      modals={[
        <Popup open={editOpen} onClose={handleEditClose}>
          <PostForm
            post={post}
            action={<CloseButton onClick={handleEditClose} />}
            handleClose={handleEditClose}
            mutation={useUpdatePost}
          />
        </Popup>,
        <Popup open={deleteOpen} onClose={handleDeleteClose}>
          <DeleteCard
            id={post.id}
            mutation={useDeletePost}
            action={<CloseButton onClick={handleDeleteClose} />}
            cancel={handleDeleteClose}
          />
        </Popup>,
      ]}
    >
      <MenuAction
        label="Edit"
        icon={<EditOutlined fontSize="medium" />}
        action={handleEditOpen}
      />
      <MenuAction
        label="Delete"
        icon={<DeleteOutlinedIcon fontSize="medium" />}
        action={handleDeleteOpen}
      />
    </ActionsMenu>
  );
}
