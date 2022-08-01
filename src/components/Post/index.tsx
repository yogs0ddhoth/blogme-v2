import * as React from 'react';
import { useForm, Controller } from "react-hook-form";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditOutlined from '@mui/icons-material/EditOutlined';

import { Post } from 'custom-types';
import PostForm from '../PostForm';

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
  const [editing, setEditing] = React.useState(false);

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card>

      <form
        className="form new-post-form"
        // onSubmit={ handleSubmit((data) => createPost.mutate(data)) }
      >
        <CardHeader
          action={ // if dashboard/user logged in && editing === false
            <>
              <IconButton aria-label="edit"
                onClick={handleOpen}
              >
                <EditOutlined />
              </IconButton>
              <Modal
                open={editing}
                onClose={handleClose}
              >
                <Card>
                  <PostForm/>
                </Card>
              </Modal>
            </>
          }
          avatar={
            <>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
              <Stack>
                <Typography>{post.user ? post.user.name : ''}</Typography>
                <Typography>{post.created_at}</Typography>
              </Stack>
            </>
          }
          title={post.title}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">{post.text}</Typography>
        </CardContent>

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
                  ? <Typography>Comments</Typography> 
                  : <></>
                }
              </ExpandMore>
            ) : (
              <></>
            )
          }
        </CardActions>
      </form>

      {post.comments !== undefined && post.comments.length
        ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {post.comments.map(comment => (
                <Stack key={comment.id} direction="row">
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                  <Stack>
                    <Card>
                      <CardHeader title={comment.user !== undefined ? comment.user.name: ''} />
                      <CardContent>
                        <Typography>{comment.text}</Typography>
                      </CardContent>
                    </Card>
                    <Typography>{comment.created_at}</Typography>
                  </Stack>
                </Stack>
              ))}
            </CardContent>
          </Collapse>
        ) : (
          <></>
        )
      }
    </Card>
  );
}
