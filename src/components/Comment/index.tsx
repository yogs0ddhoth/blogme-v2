import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { blue } from '@mui/material/colors';
import { Comment, Post } from "custom-types";
import { authContext } from '../../utils/context/contexts';
import CommentMenu from '../CommentMenu';
import CommentForm from '../CommentForm';

export default function CommentCard({user_id, comment}: {user_id:Post['user']['id'], comment:Comment}) {
  const {state, dispatch} = React.useContext(authContext);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement|null>(null);
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement|null>) => setAnchorEl(e.currentTarget);
  const handleMouseLeave = () => setAnchorEl(null);
  const hover = Boolean(anchorEl);

  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  return !editOpen 
    ? (
      <Stack key={comment.id} direction="row" 
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      >
        <Stack>
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"/>
          <Typography>{comment.user.name}</Typography>
          {/* <Typography>{comment.created_at}</Typography> */}
        </Stack>
        <Stack>
          <Card>
            {/* <CardHeader title={comment.user !== undefined ? comment.user.name: ''} /> */}
            <CardContent>
              <Typography>{comment.text}</Typography>
            </CardContent>
          </Card>
          <Typography>{comment.created_at}</Typography>
        </Stack>
        {/* IF className='sm:' <-- media query */}
        {user_id === state.id || comment.user.id === state.id 
          ? <CommentMenu comment={comment} editOpen={handleEditOpen} hover={hover}/>
          : <></>
        }
      </Stack>
    ) : (
      <CommentForm id={comment.id} commentText={comment.text} 
        closeEl={
          <Typography className='hover:underline hover:cursor-pointer'
            onClick={handleEditClose}
          >
            Cancel
          </Typography>
        }
      />
    )

}