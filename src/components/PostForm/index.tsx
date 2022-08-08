import * as React from 'react';
import { useForm, Controller } from "react-hook-form";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { authContext } from '../../utils/context/contexts';
import { useCreatePost, useUpdatePost } from "../../api/mutations";
import { Post } from "custom-types";

interface PostFormProps {
  action?:React.ReactElement;
  post?:Post;
}
export default function PostForm({action, post}:PostFormProps) {
  const {state, dispatch} = React.useContext(authContext);
  const create = useCreatePost(state.auth);
  const update = useUpdatePost(state.auth, (post !== undefined && post.id !== undefined) ? post.id : 0);

  const values = (post !== undefined) ? {title: post.title, text: post.text} : {title: "", text: ""}
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm(
    { defaultValues: values }
  );

  return (
    <Card>
      <form className="form new-post-form"
        onSubmit={handleSubmit( data => 
          (post !== undefined) 
            ? update.mutate(data, {
              onError: () => window.location.assign('/login')
            }) 
            : create.mutate(data, {
              onError: () => window.location.assign('/login')
            })
        )}
      >
        <CardHeader
          title={
            <Controller name="title" control={control}
              render={ ({field}) => (
                <TextField {...field} className="w-full" 
                  label="Title:" color="primary" 
                  error={errors.title?.message !== undefined}
                  helperText={errors.title?.message}
                />
              )}
              rules={
                {required: "This field is required."}
              }
            />
          }
          action={action}
        />

        <CardContent> 
          <Controller name="text" control={control}
            render={ ({field}) => (
              <TextField {...field} className="w-full"
                label="Post:" color="primary" multiline rows={4}
                error={errors.text?.message !== undefined}
                helperText={errors.text?.message}
              />
            )}
            rules={
              {required: "This field is required."}
            }
          />
        </CardContent>

        <Divider variant='middle'/>

        <CardActions>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}