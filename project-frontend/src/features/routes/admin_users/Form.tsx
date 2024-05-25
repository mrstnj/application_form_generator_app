"use client";

import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  FormHelperText
} from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { errorHandle } from "@/common/utils/errorHandle";

type AdminUser = {
  id: number;
  code: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

type Params = {
  params: {
    is_new: boolean;
    id?: number;
  }
}

const Form = ({ params }: Params) => {
  const { is_new, id } = params;

  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<AdminUser>();

  const title = is_new ? "管理者登録" : "管理者詳細" ;
  const action = is_new ? "登録" : "更新" ;
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

  useEffect(() => {
    if (!is_new) {
      fetch(`http://localhost:8080/admin_users/${id}`)
        .then((res) => res.json())
        .then((admin_user) => setAdminUser(admin_user));
    }
  }, [is_new, id]);

  useEffect(() => {
    if (!is_new && adminUser) {
      setValue("code", adminUser.code);
      setValue("first_name", adminUser.first_name);
      setValue("last_name", adminUser.last_name);
      setValue("email", adminUser.email);
      setValue("status", adminUser.status);
    }
  }, [is_new, adminUser, setValue]);

  const onSubmit = async (data: AdminUser) => {
    try {
      if (is_new) {
        await axios.post('http://localhost:8080/admin_users', {
          admin_user: data
        }); 
      } else {
        await axios.put(`http://localhost:8080/admin_users/${id}`, {
          admin_user: data
        });
      }
      router.push('/admin/admin_users');
    } catch (error: unknown) {
      const errorText = errorHandle(error)
      handleOpenNotification(errorText)
    }
  };

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            {title}
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        reqired: validators.required,
                      }
                    }}
                    render={({ field }) => <TextField 
                      {...field}
                      label="管理者コード"
                      error={Boolean(errors.code)}
                      helperText={errors.code?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="last_name"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        reqired: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="姓"
                      error={Boolean(errors.last_name)}
                      helperText={errors.last_name?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="first_name"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        reqired: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="名"
                      error={Boolean(errors.first_name)}
                      helperText={errors.first_name?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        reqired: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="メールアドレス"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        reqired: validators.required
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        reqired: validators.required,
                      }
                    }}
                    render={({ field }) => (
                      <FormControl fullWidth error={Boolean(errors.status)}>
                        <InputLabel>ステータス</InputLabel>
                        <Select
                          {...field}
                          label="ステータス"
                        >
                          <MenuItem value="activate">有効</MenuItem>
                          <MenuItem value="deactivate">無効</MenuItem>
                        </Select>
                        <FormHelperText>{errors.status?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <BackButton params={{path: '/admin/admin_users'}}/>
            <SubmitButton params={{action_letter: action}}/>
          </div>
        </form>  
      </Paper>
      <Notification params={{handleClose: handleCloseNotification, notification: notification}} />
    </>
  );
};

export default Form;