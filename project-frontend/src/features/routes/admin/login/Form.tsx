"use client";

import {
  Box,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { login } from "@/actions/session"

type AdminUser = {
  id: number;
  company_code: string;
  code: string;
  password: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Form = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<AdminUser>();

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    valiant: 'info' as Valiant
  })
  const [showPassword, setShowPassword] = useState(false);
  const handleOpenNotification = (message:string, valiant='error' as Valiant) =>{
    setNotification({
      open: true,
      message: message,
      valiant: valiant
    })
  }
  const handleCloseNotification = () => {
    setNotification(prevNotification => ({
      ...prevNotification,
      open: false
    }));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!(showPassword))
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (data: AdminUser) => {
    const { result, errorText = '' } = await login(data)
    if (result) {
      router.push('/admin/top');
    } else {
      handleOpenNotification(errorText)
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Box className="my-4 text-5xl">
        Welcome!
      </Box>
      <Box className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="company_code"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="企業コード"
                      error={Boolean(errors.company_code)}
                      helperText={errors.company_code?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="ログインID"
                      error={Boolean(errors.code)}
                      helperText={errors.code?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      label="パスワード"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <SubmitButton action_letter="ログイン" />
          </div>
        </form>  
        <Notification handleClose={handleCloseNotification} notification={notification} />
      </Box>
    </div>
  );
};

export default Form;