import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import { useDeletePost } from '../../api/mutations';
import Typography from '@mui/material/Typography';

export default function DeleteCard({id, action, cancel}:{id:number, action:React.ReactElement, cancel:()=>void}) {
  const deletePost = useDeletePost();
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
          onClick={() => deletePost.mutate(id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
};