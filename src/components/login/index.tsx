import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import { authContext } from '../../utils/context/contexts';
import useControllers from '../../controllers';
import { VisibilityButton } from '../Buttons';
import { LOGIN } from '../../utils/context/actions';

export default function LoginForm() {
  const { state, dispatch } = React.useContext(authContext);
  const { login } = useControllers();
  const useLogin = login.init();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });
  const [showPassword, setShowPassword] = React.useState(false);

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
        onSubmit={
          handleSubmit(
            (data) => useLogin.mutate(data, {
              onSuccess: ({data}) => {
                dispatch({
                  type: LOGIN,
                  payload: {auth: data.access_token}
                });
                // login.navigate('/dashboard');
              }
            })
          )
        }
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
                  <VisibilityButton
                    show={showPassword}
                    dispatch={setShowPassword}
                  />
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
