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
  FormHelperText,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, MouseEvent } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { errorHandle } from "@/common/utils/errorHandle";
import { updateAdminUser } from "@/actions/adminUser"

type AdminUser = {
  id: number;
  code: string;
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  password: string;
  status: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  adminUser?: AdminUser | null;
}

const Form = ({ is_new, id, adminUser }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<AdminUser>();

  const title = is_new ? "管理者登録" : "管理者詳細" ;
  const action = is_new ? "登録" : "更新" ;
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
    const { result, errorText = '' } = await updateAdminUser(is_new, data, id)
    if (result) {
      router.push('/admin/admin_users');
      router.refresh();
    } else {
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required,
                        pattern: validators.code
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="last_name"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required
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
                        required: validators.required
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required,
                        pattern: validators.email
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
              {/* { !is_new &&
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="current_password"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: {
                          required: validators.required
                        }
                      }}
                      render={({ field }) => <TextField
                        {...field}
                        label="現在のパスワード"
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
              } */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        ...(is_new && { required: validators.required }),
                        pattern: validators.password
                      }                 
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      label={is_new ? "パスワード" : "変更後のパスワード"}
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required,
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
            <BackButton path={'/admin/admin_users'} />
            <SubmitButton action_letter={action} />
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;