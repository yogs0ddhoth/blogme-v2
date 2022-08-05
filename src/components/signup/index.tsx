import * as React from 'react';
import { useForm, Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useSignup } from "../../api/mutations";
import { authContext } from '../../utils/context/contexts';
import { LOGIN } from '../../utils/context/actions';

export default function SignupForm() {
  const {state, dispatch} = React.useContext(authContext);
  const signup = useSignup(dispatch)
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm(
    { defaultValues: {name: "", email: "", password: ""} }
  );

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <div className="col-md-6">
      <h2>Signup</h2>
      <form 
        className=""
        onSubmit={ handleSubmit(data => signup.mutate(data)) }
      >
        <FormControl className="name" 
          required 
          error={errors.name?.message !== undefined}
        >
          <Controller
            name="name"
            control={control}
            render={ ({field}) => {
              return (
                <TextField {...field} 
                  label="Name:" color="primary"
                  helperText={errors.name?.message}
                />
              )
            }}
            rules={
              {required: "This field is required."}
            }
          />
        </FormControl>
          
        <FormControl className="email"  
          required error={errors.email?.message !== undefined}
        >
          <Controller
            name="email"
            control={control}
            render={ ({field}) => {
              return (
                <TextField {...field} 
                  label="Email:" color="primary" helperText={errors.email?.message}
                />
              )
            }}
            rules={{
              pattern: {
                value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                message: "Enter a valid email address."
              }
            }}
          />
        </FormControl>
          
        <FormControl className="password">
          <Controller
            name="password"
            control={control}
            render={ ({field}) => (
              <>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <OutlinedInput {...field}
                  id="password2" color="primary" 
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
              </>
            )}
          />
        </FormControl>
          
        <Button type="submit" variant="outlined">
          Submit
        </Button>     
      </form>
    </div>
  )
}