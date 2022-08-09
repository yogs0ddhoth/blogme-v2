import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { blue } from '@mui/material/colors';
import { Comment, Post } from "custom-types";
import { authContext } from '../../utils/context/contexts';
import CommentMenu from '../CommentMenu';
import CommentForm from '../CommentForm';
import UserAvatar from '../../UserAvatar';

interface CommentCardProps {
  user_id:Post['user']['id'];
  comment:Comment;
}
export default function CommentCard({user_id, comment}:CommentCardProps) {
  const {state, dispatch} = React.useContext(authContext);

  // hover state - for rendering menu
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement|null>(null);
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement|null>) => setAnchorEl(e.currentTarget);
  const handleMouseLeave = () => setAnchorEl(null);
  const hover = Boolean(anchorEl);

  // edit state
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  return !editOpen 
    ? (
      <Stack key={comment.id} direction="row" 
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      >
        <UserAvatar name={comment.user.name} color='#18ffff' />
        <Stack>
          <Card color='secondary-light'>
            <CardContent>
              <Typography>{comment.text}</Typography>
            </CardContent>
          </Card>
          <Typography>
            {Date.parse(comment.updated_at) > Date.parse(comment.created_at) 
              ? 'edited '.concat(new Date(comment.updated_at).toLocaleDateString('en-us')) 
              : new Date(comment.created_at).toLocaleDateString('en-us')
            }
            </Typography>
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