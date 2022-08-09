import * as React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Post } from 'custom-types';
import CommentCard from '../Comment';
import PostMenu from '../PostMenu';
import CommentForm from '../CommentForm';
import VoteButton from '../Vote';

import { authContext } from '../../utils/context/contexts';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface HeaderAvatarProps {
  name:string;
  created_at:string;
  updated_at:string;
}
const HeaderAvatar = ({name, created_at, updated_at}:HeaderAvatarProps) => {
  const date = Date.parse(updated_at) > Date.parse(created_at) 
    ? 'edited '.concat(new Date(updated_at).toLocaleDateString('en-us')) 
    : new Date(created_at).toLocaleDateString('en-us')
  return (
    <>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
      <Stack>
        <Typography>{name}</Typography>
        <Typography>
          {date}
        </Typography>
      </Stack>
    </>
  )
}

export default function PostCard({post}:{post:Post}) {
  const {state, dispatch} = React.useContext(authContext);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card color='secondary'>

      <CardHeader
        avatar={ <HeaderAvatar name={post.user.name} created_at={post.created_at} updated_at={post.updated_at} /> }
        title={ 
          <Link to={`/post/${post.id}`}>
            <Typography variant='h6'>{post.title}</Typography>
          </Link> 
        }
        action={post.user.id == state.id
          ? <PostMenu post={post}/> 
          : <></>
        }
      />

      <CardContent>
        <Typography variant="body1">{post.text}</Typography>
      </CardContent>
      
      <Divider variant='middle'/>

      <CardActions disableSpacing>
        <VoteButton id={post.id} vote_count={post.vote_count} />
        {post.comments.length 
          ? (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
              {!expanded 
                ? <Typography>
                    {post.comments.length} Comment{post.comments.length > 1 ? 's' : ''}
                  </Typography> 
                : <></>
              }
            </ExpandMore>
          ) : (
            <></>
          )
        }
        
      </CardActions>

      <Divider/>

      {post.comments.length
        ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {post.comments.map(
                comment => <CommentCard key={comment.id} user_id={post.user.id} comment={comment} />
              )}
            </CardContent>
          </Collapse>
        ) : (
          <></>
        )
      }

      <CardContent> 
        {state.auth !== null 
          ? <CommentForm id={post.id as number}/> 
          : <></>
        }
      </CardContent>
    </Card>
  );
}
