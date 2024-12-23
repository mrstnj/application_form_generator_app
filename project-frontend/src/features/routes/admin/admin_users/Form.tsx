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
  IconButton,
  FormControlLabel,
  Checkbox 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, MouseEvent } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updateAdminUser } from "@/actions/adminUser"
import { useCurrentUser } from '@/contexts/currentUserContext';

type AdminUser = {
  id: number;
  company_id?: number;
  company?: Company;
  code: string;
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  password: string;
  status: string;
  is_super_admin: boolean;
};

type Company = {
  id: number;
  name: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  adminUser?: AdminUser | null;
  companies?: Company[];
}

const Form = ({ is_new, id, adminUser, companies }: Props) => {
  const { current_user } = useCurrentUser();
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
      setValue("company_id", adminUser.company?.id);
      setValue("code", adminUser.code);
      setValue("first_name", adminUser.first_name);
      setValue("last_name", adminUser.last_name);
      setValue("email", adminUser.email);
      setValue("status", adminUser.status);
      setValue("is_super_admin", adminUser.is_super_admin);
    }
  }, [is_new, adminUser, setValue]);

  const onSubmit = async (data: AdminUser) => {
    const { result, errorText = '' } = await updateAdminUser(is_new, data, id)
    if (result) {
      router.push('/admin/admin_users');
      router.refresh();
      const commit_message = is_new ? "管理者情報を登録しました。" : "管理者情報を更新しました。"
      handleOpenNotification(commit_message, 'success')
    } else {
      handleOpenNotification(errorText)
    }
  };

  return (
    <>
      <Paper elevation={0} className="max-w-full mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            {title}
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              {current_user.is_super_admin &&
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="company_id"
                      control={control}
                      defaultValue={companies?.[0].id}
                      rules={{
                        validate: {
                          required: validators.required,
                        }
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={Boolean(errors.company_id)}>
                          <InputLabel>企業名</InputLabel>
                          <Select
                            {...field}
                            label="企業名"
                          >
                            {companies?.map((company, index) => (
                              <MenuItem key={index} value={company.id}>{company.name}</MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.company_id?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </FormControl>
                </Grid>
              }
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
              { !is_new &&
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="current_password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => <TextField
                        {...field}
                        type={showPassword ? "text" : "password"}
                        label="現在のパスワード"
                        error={Boolean(errors.current_password)}
                        helperText={errors.current_password?.message}
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
              }
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
              <Grid item sm={6} />
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="is_super_admin"
                    control={control}
                    render={({ field }) => <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!field.value}
                          disabled={!current_user.is_super_admin}
                        />
                      }
                      label="システム管理者"
                    />}
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