import { useForm, Controller } from "react-hook-form";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { useCreatePost, useUpdatePost } from "../../api/mutations";
import { Post } from "custom-types";

export default function PostForm({action, post}:{action?:React.ReactElement, post?:Post}) {
  const create = useCreatePost();
  const update = useUpdatePost();
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
          (post !== undefined && post.id !== undefined) 
            ? update.mutate({id: post.id, data}) 
            : create.mutate(data)
        )}
      >
        <CardHeader
          title={
            <FormControl className="w-full" 
              required error={errors.title?.message !== undefined}
            >
              <Controller name="title" control={control}
                render={ ({field}) => (
                  <TextField {...field} 
                    label="Title:" color="primary" 
                    helperText={errors.title?.message}
                  />
                )}
                rules={
                  {required: "This field is required."}
                }
              />
            </FormControl>
          }
          action={action}
        />

        <CardContent> 
          <FormControl className="w-full" 
            required error={errors.text?.message !== undefined}
          >
            <Controller name="text" control={control}
              render={ ({field}) => (
                <TextField {...field} 
                  label="Post:" color="primary" multiline rows={4}
                />
              )}
              rules={
                {required: "This field is required."}
              }
            />
          </FormControl>
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