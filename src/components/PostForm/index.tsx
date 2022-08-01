import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useCreatePost, useUpdatePost } from "../../api/mutations";

export default function PostForm({id, post}:{id?:number, post?:{title:string, text:string}}) {
  const create = useCreatePost();
  const update = useUpdatePost();
  const values = (post === undefined) ? {title: "", text: ""} : post
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm(
    { defaultValues: values }
  );

  return (
    <form 
      className="form new-post-form"
      onSubmit={handleSubmit(
          (data) => (id === undefined) ? create.mutate(data) : update.mutate({id, data})
        )
      }
    >
      <FormControl className="w-full"  
        required error={errors.title?.message !== undefined}
      >
        <Controller
          name="title"
          control={control}
          render={ ({field}) => {
            return (
              <TextField {...field} 
                label="Title:" color="primary" helperText={errors.title?.message}
              />
            )
          }}
          rules={
            {required: "This field is required."}
          }
        />
      </FormControl>
        
      <FormControl className="w-full"
        required error={errors.text?.message !== undefined}
      >
        <Controller
          name="text"
          control={control}
          render={ ({field}) => {
            return (
              <TextField {...field} 
                label="Post:" color="primary" multiline rows={4}
              />
            )
          }}
          rules={
            {required: "This field is required."}
          }
        />
      </FormControl>
        
      <Button type="submit" variant="outlined">
        Submit
      </Button>     
    </form>
  )
}