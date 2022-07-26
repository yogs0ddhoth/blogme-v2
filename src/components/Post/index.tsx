import * as React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CommentCard from '../Comment';
import PostMenu from '../Menus/PostMenu';
import CommentForm from '../Forms/CommentForm';
import UserAvatar from '../UserAvatar';
import Votes from '../Vote';

import { Post } from 'custom-types';
import { useTheme } from '@mui/material/styles';
import { authContext } from '../../utils/context/contexts';
import useControllers from '../../utils/api';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled(
  // eslint-disable-next-line
  (props: ExpandMoreProps) => {
    // eslint-disable-next-line
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  }
)(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface PostCardProps {
  post: Post;
  menu?: JSX.Element;
  comment?: JSX.Element;
  // commentFormMutation?: UseMutationResult<AxiosResponse<any, any>, unknown, CommentInput, void>
}
export default function PostCard({ post }: PostCardProps) {
  const { state } = React.useContext(authContext);
  const { auth } = state;

  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const { createComment } = useControllers();
  const useCreateComment = createComment.init(auth);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card
      // className="mt-5"
      elevation={2}
      // sx={{ bgcolor: darkMode ? 'primary.dark' : '' }}
    >
      <CardHeader
        sx={{ bgcolor: darkMode ? '' : 'secondary.main' }}
        avatar={
          <UserAvatar
            name={post.user.name}
            color={darkMode ? 'secondary.main' : 'primary.light'}
            timestamps={{
              created_at: post.created_at,
              updated_at: post.updated_at,
            }}
          />
        }
        action={
          post.user.id == state.id ? (
            <PostMenu post={post} darkMode={darkMode} />
          ) : (
            <></>
          )
        }
      />
      <Divider sx={{ bgcolor: 'secondary.main' }} variant="fullWidth" />
      {/* { darkMode ? <Divider sx={{color: 'secondary.main'}} variant='fullWidth' /> : <></>} */}
      <CardContent
      // sx={{ bgcolor: darkMode ? 'primary.dark' : '' }}
      >
        <Link to={`/post/${post.id}`}>
          <Typography variant="h5">{post.title}</Typography>
        </Link>

        <Typography variant="body1">{post.text}</Typography>
      </CardContent>

      <Divider
        sx={{ bgcolor: darkMode ? 'secondary.main' : '' }}
        variant="middle"
      />

      <CardActions
        disableSpacing
        // sx={{ bgcolor: darkMode ? 'primary.dark' : '' }}
      >
        <Votes
          post_id={post.id}
          vote_count={post.vote_count}
          votes={post.votes}
        />
        {post.comments.length ? (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              '&:hover': {
                color: darkMode ? 'secondary.main' : '',
              },
            }}
          >
            <ExpandMoreIcon
            // sx={{
            //   '&:hover': {
            //     color: darkMode ? 'secondary.main' : ''
            //   }
            // }}
            />
            {!expanded ? (
              <Typography
              // sx={{
              //   '&:hover': {
              //     color: darkMode ? 'secondary.main' : ''
              //   }
              // }}
              >
                {post.comments.length} Comment
                {post.comments.length > 1 ? 's' : ''}
              </Typography>
            ) : (
              <></>
            )}
          </ExpandMore>
        ) : (
          <></>
        )}
      </CardActions>

      {/* <Divider sx={{ bgcolor: darkMode ? 'secondary.main' : '' }} /> */}

      {post.comments.length ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="flex flex-col gap-2">
            {post.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                post_user_id={post.user.id}
                comment={comment}
              />
            ))}
          </CardContent>
        </Collapse>
      ) : (
        <></>
      )}

      <CardContent>
        {state.auth !== null ? (
          <CommentForm id={post.id as number} mutation={useCreateComment} />
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
