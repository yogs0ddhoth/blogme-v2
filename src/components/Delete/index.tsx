import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { MutationInstance } from 'custom-types';
import { useTheme } from '@mui/system';

interface DeleteCardProps {
  id: number;
  action: React.ReactElement;
  cancel: () => void;
  mutation: MutationInstance<void>;
}
export default function DeleteCard({
  id,
  action,
  cancel,
  mutation,
}: DeleteCardProps) {
  const darkMode = useTheme().palette.mode === 'dark';

  return (
    <Card>
      <CardHeader
        title={<Typography>Delete this post?</Typography>}
        action={action}
      />
      <Divider variant="middle" sx={{ bgcolor: darkMode ? 'secondary.main' : '' }} />
      <CardContent>
        <Typography>Are you sure you want to delete this post?</Typography>
      </CardContent>

      <CardActions>
        <Button variant="outlined" 
          color={darkMode ? "secondary" : "primary"}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button variant={darkMode ? "contained" : "outlined"} 
          // sx={{
          //   color: darkMode ? "secondary.main" : "primary"
          // }}
          color={darkMode ? "secondary" : "primary"}
          onClick={() => mutation.mutate()}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
