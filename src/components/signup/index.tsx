import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'

import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { authContext } from '../../utils/context/contexts'
import useControllers from '../../controllers'

export default function SignupForm() {
  const { state, dispatch } = React.useContext(authContext)
  const { useSignup } = useControllers();
  const signup = useSignup(dispatch)
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', password: '' } })

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => event.preventDefault()

  return (
    <div className="container flex flex-col gap-3 justify-center items-center">
      <Avatar className="bg-[#69f0ae]">
        <LockOutlinedIcon className="text-[#212121]" />
      </Avatar>
      <Typography variant="h4" className="text-center">
        Signup
      </Typography>
      <form
        className="flex flex-col gap-3 w-full items-center"
        onSubmit={handleSubmit((data) => signup.mutate(data))}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormControl
              className="name w-2/3 sm:w-1/2 lg:w-[40%] xl:w-1/3"
              error={errors.name?.message !== undefined}
            >
              <InputLabel htmlFor="name">Name *</InputLabel>
              <OutlinedInput {...field} label="Name *" color="primary" />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </FormControl>
          )}
          rules={{ required: '* This field is required.' }}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl
              className="email w-2/3 sm:w-1/2 lg:w-[40%] xl:w-1/3"
              error={errors.email?.message !== undefined}
            >
              <InputLabel htmlFor="email">Email Address *</InputLabel>
              <OutlinedInput
                {...field}
                label="Email Address *"
                color="primary"
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
          )}
          rules={{
            pattern: {
              value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
              message: '* Enter a valid email address.',
            },
            required: '* This field is required',
          }}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl
              className="password w-2/3 sm:w-1/2 lg:w-[40%] xl:w-1/3"
              error={errors.password?.message !== undefined}
            >
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                {...field}
                color="primary"
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          )}
          rules={{ required: '* This field is required' }}
        />

        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  )
}
