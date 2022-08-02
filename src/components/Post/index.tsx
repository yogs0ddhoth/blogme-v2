import * as React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import EditOutlined from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Post } from 'custom-types';
import CommentCard from '../Comment';
import PostForm from '../PostForm';
import PostMenu from '../PostMenu';

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

export default function PostCard({post}:{post:Post}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  const [actionOpen, setActionOpen] = React.useState(false);
  const handleActionOpen = () => {
    setActionOpen(true);
  };
  const handleActionClose = () => {
    setActionOpen(false);
  };

  return (
    <Card>

      {/* <form
        className="form new-post-form"
        // onSubmit={ handleSubmit((data) => createPost.mutate(data)) }
      > */}
        <CardHeader
          avatar={
            <>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
              <Stack>
                <Typography>{post.user ? post.user.name : ''}</Typography>
                <Typography>{post.created_at}</Typography>
              </Stack>
            </>
          }
          title={
            <Link to={`/post/${post.id}`}>
              {post.title}
            </Link>
          }
          action={
            <PostMenu post={post}/>
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">{post.text}</Typography>
        </CardContent>
        
        <Divider variant='middle'/>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {post.comments !== undefined && post.comments.length 
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
      {/* </form> */}
      <Divider/>
      {post.comments !== undefined && post.comments.length
        ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {post.comments.map(comment => <CommentCard comment={comment} />)}
            </CardContent>
          </Collapse>
        ) : (
          <></>
        )
      }
      <CardContent
        // if the user is logged in
      > 
        <Stack direction={'row'}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
          <TextField />
        </Stack>
      </CardContent>
    </Card>
  );
}
