import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import { useComment } from '../../api/mutations';

export default function CommentForm({id}:{id:number}) {
  const comment = useComment();
  const [commentState, setCommentState] = React.useState('');

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    console.log({post_id:id, text: commentState})
    return comment.mutate({post_id:id, text: commentState});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={'row'}>
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
        <TextField 
          label='comment' variant='standard' multiline 
          value={commentState} onChange={e => setCommentState(e.target.value)}
        />
        <IconButton type='submit'>
          <SendIcon/>
        </IconButton>
      </Stack>
    </form>
  );
};