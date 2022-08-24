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

interface PostFormProps {
  action?: React.ReactElement;
  post?: Post;
  handleClose?: () => void;
  mutation: MutationInstance<PostInput>;
}

export default function PostForm({
  action,
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

  return (
    <Card className="w-full">
      <form
        className="flex flex-col gap-3 w-full"
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
        <CardHeader action={action} />

        {/* <Divider color='primary' variant='middle'/> */}

        <CardContent>
          <div className="">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full"
                  label="Title:"
                  color="primary"
                  error={errors.title?.message !== undefined}
                  helperText={errors.title?.message}
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
                  className="w-full"
                  label="Post:"
                  color="primary"
                  multiline
                  rows={4}
                  error={errors.text?.message !== undefined}
                  helperText={errors.text?.message}
                />
              )}
              rules={{ required: 'This field is required.' }}
            />
          </div>
        </CardContent>

        <Divider color="primary" variant="middle" />

        <CardActions className="flex flex-row justify-end">
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
