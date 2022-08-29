import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CommentMenu from '../Menus/CommentMenu';
import CommentForm from '../Forms/CommentForm';
import UserAvatar from '../UserAvatar';
import Timestamp from '../Timestamp';

import { Comment, Post } from 'custom-types';
import { authContext } from '../../utils/context/contexts';
import useControllers from '../../controllers';
import { useTheme } from '@mui/system';

interface CommentCardProps {
  post_user_id: Post['user']['id'];
  comment: Comment;
}
export default function CommentCard({
  post_user_id,
  comment,
}: CommentCardProps) {
  const { state, dispatch } = React.useContext(authContext);
  const { useUpdateComment } = useControllers();
  const updateComment = useUpdateComment({ auth: state.auth, id: comment.id });

  // edit state
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const darkMode = useTheme().palette.mode === 'dark';

  return !editOpen ? (
    <CommentView
      post_user_id={post_user_id}
      comment={comment}
      darkMode={darkMode}
      state={state}
      editOpen={handleEditOpen}
    />
  ) : (
    <CommentForm
      id={comment.id}
      mutation={updateComment}
      commentText={comment.text}
      closeEl={
        <Typography
          className="hover:underline hover:cursor-pointer"
          onClick={handleEditClose}
          sx={{
            "&:hover": {
              color: darkMode ? "secondary.main" : ""
            }
          }}
        >
          Cancel
        </Typography>
      }
    />
  );
}

interface CommentViewProps extends CommentCardProps {
  state: {
    id: number;
    user: string;
    auth: string | null;
  };
  darkMode: boolean;
  editOpen: () => void;
}
const CommentView = ({
  post_user_id,
  comment,
  darkMode,
  state,
  editOpen,
}: CommentViewProps) => {
  // hover state - for rendering menu
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement | null>) => setAnchorEl(e.currentTarget);
  const handleMouseLeave = () => setAnchorEl(null);
  const hover = Boolean(anchorEl);

  return (
    <Stack
      key={comment.id}
      direction="row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <UserAvatar name={comment.user.name} color="#18ffff" />
      <Stack>
        <Card color="secondary-light" elevation={darkMode ? 5 : 1}>
          <CardContent>
            <Typography>{comment.text}</Typography>
          </CardContent>
        </Card>
        <Timestamp
          created_at={comment.created_at}
          updated_at={comment.updated_at}
        />
      </Stack>
      {post_user_id === state.id || comment.user.id === state.id 
        ? (
          <CommentMenu 
            comment={comment} 
            darkMode={darkMode}
            editOpen={editOpen} 
            hover={hover} 
          />
        ) 
        : <></>
      }
    </Stack>
  );
};