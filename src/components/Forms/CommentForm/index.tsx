import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import useTheme from '@mui/material/styles/useTheme';
import theme from '../../../utils/mui-theme';

import { CommentInput, MutationInstance } from 'custom-types';

interface CommentFormProps {
  id: number;
  commentText?: string;
  closeEl?: React.ReactNode;
  handleClose?: () => void;
  mutation: MutationInstance<CommentInput>;
}
export default function CommentForm({
  id,
  commentText,
  closeEl,
  handleClose,
  mutation,
}: CommentFormProps) {
  const [commentState, setCommentState] = React.useState(
    commentText !== undefined ? commentText : ''
  );
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(
      { post_id: id, text: commentState },
      {
        onSuccess: (data) => {
          console.log(data);
          setCommentState('');
          if (handleClose) {
            handleClose();
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Avatar sx={{ bgcolor: theme.palette.error.light }} />
        <Stack className="w-[90%]">
          <TextField
            label="comment"
            variant="standard"
            multiline
            color={darkMode ? 'secondary' : 'primary'}
            value={commentState}
            onChange={(e) => setCommentState(e.target.value)}
          />
          {closeEl}
        </Stack>
        <IconButton
          type="submit"
          sx={{
            '&:hover': {
              color: darkMode ? 'secondary.main' : 'secondary.dark',
            },
          }}
        >
          <SendIcon
          // sx={{':hover': {bgcolor:  darkMode ? 'secondary' : 'primary' }}}
          // color={  }
          />
        </IconButton>
      </Stack>
    </form>
  );
}
