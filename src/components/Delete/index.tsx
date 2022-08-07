import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { authContext } from '../../utils/context/contexts';
import { useDeletePost } from '../../api/mutations';

export default function DeleteCard({id, action, cancel}:{id:number, action:React.ReactElement, cancel:()=>void}) {
  const {state} = React.useContext(authContext);
  const deletePost = useDeletePost(state.auth, id);
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            Delete this post?
          </Typography>
        }
        action={action}
      />
      <Divider variant='middle'/>
      <CardContent>
        <Typography>
          Are you sure you want to delete this post?
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant='outlined' onClick={cancel}>
          Cancel
        </Button>
        <Button variant='outlined'
          onClick={() => deletePost.mutate()}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
};