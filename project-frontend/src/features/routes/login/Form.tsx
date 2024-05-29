"use client";

import {
  Box,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { errorHandle } from "@/common/utils/errorHandle";
import { cookies } from 'next/headers'

type AdminUser = {
  id: number;
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

  const onSubmit = async (data: AdminUser) => {
    try {
      const response = await axios.post('http://localhost:8080/sessions', {
        session: data
      });
      console.log(response)
      cookies().set('accessToken', response.data.access_token)
      router.push('/admin/top');
    } catch (error: unknown) {
      const errorText = errorHandle(error)
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
                      label="パスワード"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
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