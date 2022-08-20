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
import { authContext } from '../../utils/context/contexts';
import useControllers from '../../controllers';

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

interface PostCardProps {
  post: Post;
  menu?: JSX.Element;
  comment?: JSX.Element;
  // commentFormMutation?: UseMutationResult<AxiosResponse<any, any>, unknown, CommentInput, void>
}
export default function PostCard({ post, menu, comment }: PostCardProps) {
  const { state, dispatch } = React.useContext(authContext);
  const { useCreateComment } = useControllers();
  const createComment = useCreateComment({ auth: state.auth });

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card color="secondary">
      <CardHeader
        avatar={
          <UserAvatar
            name={post.user.name}
            color="#69f0ae"
            timestamps={{
              created_at: post.created_at,
              updated_at: post.updated_at,
            }}
          />
        }
        action={post.user.id == state.id ? <PostMenu post={post} /> : <></>}
      />
      <Divider color="primary" />
      <CardContent>
        <Link to={`/post/${post.id}`}>
          <Typography variant="h5">{post.title}</Typography>
        </Link>

        <Typography variant="body1">{post.text}</Typography>
      </CardContent>

      <Divider variant="middle" />

      <CardActions disableSpacing>
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
          >
            <ExpandMoreIcon />
            {!expanded ? (
              <Typography>
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

      <Divider />

      {post.comments.length ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
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
          <CommentForm id={post.id as number} 
            mutation={createComment} 
          />
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
