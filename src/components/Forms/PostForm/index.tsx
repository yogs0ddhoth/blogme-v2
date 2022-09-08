import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import { PostInput, Post, MutationInstance } from 'custom-types';
import { useTheme } from '@mui/system';

interface PostFormProps {
  action?: React.ReactElement;
  className?: string;
  post?: Post;
  handleClose?: () => void;
  mutation: MutationInstance<PostInput>;
}

export default function PostForm({
  action,
  className,
  post,
  handleClose,
  mutation,
}: PostFormProps) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      post !== undefined
        ? { title: post.title, text: post.text }
        : { title: '', text: '' },
  });
  const darkMode = useTheme().palette.mode == 'dark';

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutation.mutate(data, {
          onSuccess: () => {
            reset();
            if (handleClose) {
              handleClose();
            }
          },
        })
      )}
    >
      <Card
        className={
          'flex flex-col w-full gap-3 mt-5' + className ? className : ''
        }
      >
        {action ? <CardHeader action={action} /> : <></>}

        <CardContent className="flexCol gap-3 justify-center">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title:"
                color={darkMode ? 'secondary' : 'primary'}
                error={errors.title?.message !== undefined}
                helperText={errors.title?.message}
                sx={{ minWidth: '80%' }}
              />
            )}
            rules={{ required: 'This field is required.' }}
          />
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Post:"
                color={darkMode ? 'secondary' : 'primary'}
                multiline
                rows={4}
                error={errors.text?.message !== undefined}
                helperText={errors.text?.message}
                sx={{ minWidth: '80%' }}
              />
            )}
            rules={{ required: 'This field is required.' }}
          />
        </CardContent>

        <Divider
          sx={{ bgcolor: darkMode ? 'secondary.main' : '' }}
          variant="middle"
        />

        <CardActions className="flexRow justify-end">
          <Button
            type="submit"
            variant={darkMode ? 'contained' : 'outlined'}
            sx={{
              bgcolor: darkMode ? 'secondary.main' : '',
              color: darkMode ? 'primary.main' : '',
              '&:hover': {
                // bgcolor: darkMode ? 'primary.contrast' : '',
                color: darkMode ? 'secondary.main' : '',
              },
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
