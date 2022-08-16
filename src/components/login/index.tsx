import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { authContext } from '../../utils/context/contexts';
import useControllers from '../../controllers';

export default function LoginForm() {
  const { state, dispatch } = React.useContext(authContext);
  const { useLogin } = useControllers();
  const login = useLogin(dispatch);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  return (
    <div className="container flex flex-col gap-3 justify-center items-center">
      <Avatar className="bg-[#69f0ae]">
        <LockOpenOutlinedIcon />
      </Avatar>
      <Typography variant="h4" className="text-center">
        Login
      </Typography>

      <form
        className="flex flex-col gap-3 w-full items-center"
        onSubmit={handleSubmit((data) => login.mutate(data))}
      >
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
      <a href="/signup" className="" id="">
        signup instead
      </a>
    </div>
  );
}
