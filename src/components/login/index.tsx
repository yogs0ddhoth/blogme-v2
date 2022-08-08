import * as React from 'react';
import { useForm, Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useLogin } from "../../api/mutations"
import { authContext } from '../../utils/context/contexts';
import { LOGIN } from '../../utils/context/actions';

export default function LoginForm() {
  const {state, dispatch} = React.useContext(authContext);

  const login = useLogin(dispatch);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm(
    { defaultValues: {email: "", password: ""} }
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
 
  return (
    <div className="col-md-6">
      <h2>Login</h2>
      <form 
        className=""
        onSubmit={ handleSubmit(data => login.mutate(data)) }
      >
        <Controller
          name="email"
          control={control}
          render={ ({field}) => (
            <FormControl className="email"  
              error={errors.email?.message !== undefined}
            >
              <InputLabel htmlFor="email">Email:</InputLabel>
              <OutlinedInput {...field} 
                label="Email:" color="primary" 
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
          )}
          rules={{
            pattern: {
              value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
              message: "* Enter a valid email address."
            },
            required:'* This field is required'
          }}
        />
          
        <Controller
          name="password"
          control={control}
          render={ ({field}) => (
            <FormControl className="password"
              error={errors.password?.message !== undefined}
            >
              <InputLabel htmlFor="password">Password:</InputLabel>
              <OutlinedInput {...field}
                color="primary" 
                label="Password:"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          )}
          rules={ {required:'* This field is required'} }
        />
          
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>     
      </form>
      <a href="/signup" className="" id="">signup instead</a>
    </div>
  )
}