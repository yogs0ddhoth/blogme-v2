import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';

import theme from '../../../utils/mui-theme';

import { CommentInput } from 'custom-types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface CommentFormProps {
  id: number;
  commentText?: string;
  closeEl?: React.ReactNode;
  mutation: UseMutationResult<AxiosResponse<any, any>, unknown, CommentInput, unknown>;
}
export default function CommentForm({id, commentText, closeEl, mutation}:CommentFormProps) {
  const [commentState, setCommentState] = React.useState(commentText !== undefined ? commentText : '');

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({post_id: id, text: commentState});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction='row' justifyContent='center'
        spacing={2}
      >
        <Avatar sx={{ bgcolor: theme.palette.error.light }} />
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