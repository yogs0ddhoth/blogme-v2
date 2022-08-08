import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';

import { useComment } from '../../api/mutations';
import { authContext } from '../../utils/context/contexts';

interface CommentFormProps {
  id:number;
  commentText?:string;
  closeEl?:React.ReactNode;
}
export default function CommentForm({id, commentText, closeEl}:CommentFormProps) {
  const {state, dispatch} = React.useContext(authContext);
  const comment = useComment(state.auth);
  const [commentState, setCommentState] = React.useState(commentText !== undefined ? commentText : '');

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    return comment.mutate({post_id: id, text: commentState}, {
      onError: () => window.location.assign('/login')
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction='row' justifyContent='center'
        spacing={2}
      >
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
        <Stack className='w-[90%]'>
          <TextField 
            label='comment' variant='standard' multiline 
            value={commentState} onChange={e => setCommentState(e.target.value)}
          />
          {closeEl}
        </Stack>
        <IconButton type='submit'>
          <SendIcon/>
        </IconButton>
      </Stack>
    </form>
  );
};