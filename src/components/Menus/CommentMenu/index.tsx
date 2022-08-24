import * as React from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CloseButton } from '../../Buttons';
import DeleteCard from '../../Delete';
import { ActionsMenu, MenuAction } from '..';
import Popup from '../../StyledModal';

import { authContext } from '../../../utils/context/contexts';
import { Comment } from 'custom-types';
import useControllers from '../../../controllers';

interface CommentMenuProps {
  comment: Comment;
  editOpen: () => void;
  hover: boolean;
}
export default function CommentMenu({
  comment,
  editOpen,
  hover,
}: CommentMenuProps) {
  const { state, dispatch } = React.useContext(authContext);
  const { useDeleteComment } = useControllers();
  const deleteComment = useDeleteComment({ auth: state.auth, id: comment.id });
  // Delete action state
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <ActionsMenu 
      icon={<MoreVertIcon />}
      className={hover ? '' : 'sm:invisible'}
      modals={[
        <Popup open={deleteOpen} onClose={handleDeleteClose}>
          <DeleteCard
            id={comment.id}
            mutation={deleteComment}
            action={<CloseButton onClick={handleDeleteClose} />}
            cancel={handleDeleteClose}
          />
        </Popup>,
      ]}
    >
      {comment.user.id === state.id ? (
        <MenuAction
          label="Edit"
          icon={<EditOutlined fontSize="medium" />}
          action={editOpen}
        />
      ) : (
        <div></div>
      )}
      <MenuAction
        label="Delete"
        icon={<DeleteOutlinedIcon fontSize="medium" />}
        action={handleDeleteOpen}
      />
    </ActionsMenu>
  );
}
