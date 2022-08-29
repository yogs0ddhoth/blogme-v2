import * as React from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CloseButton } from '../../Buttons';
import DeleteCard from '../../Delete';
import { ActionsMenu, MenuAction, Popup } from '..';

import { authContext } from '../../../utils/context/contexts';
import { Comment } from 'custom-types';
import useControllers from '../../../controllers';

interface CommentMenuProps {
  className?: string
  comment: Comment;
  darkMode: boolean;
  editOpen: () => void;
  hover: boolean;
}
export default function CommentMenu({
  className,
  comment,
  darkMode,
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

  const highlight = `hover:text-[${darkMode ?'#69f0ae' : '#171717'}]`;

  return (
    <ActionsMenu
      icon={<MoreVertIcon />}
      className={`${highlight} ${hover ? 'visible' : 'sm:invisible'}`}
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
        <></>
      )}
      <MenuAction
        label="Delete"
        className={highlight}
        icon={<DeleteOutlinedIcon fontSize="medium" />}
        action={handleDeleteOpen}
      />
    </ActionsMenu>
  );
}
