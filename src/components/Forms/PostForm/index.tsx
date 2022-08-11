import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import { authContext } from '../../../utils/context/contexts'
import { PostInput, Post } from 'custom-types'
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import useControllers from '../../../controllers'

interface PostFormProps {
  action?: React.ReactElement
  post?: Post
  mutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    PostInput,
    unknown
  >
}
export default function PostForm({ action, post, mutation }: PostFormProps) {
  const { useCreatePost, useUpdatePost } = useControllers();

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
  })

  return (
    <Card className="w-full">
      <form
        className="flex flex-col gap-3 w-full"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
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
  )
}
