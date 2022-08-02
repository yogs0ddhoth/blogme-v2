import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { blue } from '@mui/material/colors';
import { Comment } from "custom-types";

export default function CommentCard({comment}: {comment:Comment}) {
  return (
    <Stack key={comment.id} direction="row">
      
      <Stack>
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"/>
        <Typography>{comment.user ? comment.user.name : ''}</Typography>
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
    </Stack>
  )
}