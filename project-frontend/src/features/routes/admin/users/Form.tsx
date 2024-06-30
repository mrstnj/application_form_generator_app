"use client";

import {
  Typography,
  Paper,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, MouseEvent } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updateUser } from "@/actions/user"

type User = {
  id: number;
  email: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  id: number;
  user?: User | null;
}

const Form = ({ id, user }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<User>();

  const title = "会員詳細" ;
  const action = "更新" ;
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
    user && setValue("email", user.email);
  }, [user, setValue]);

  const onSubmit = async (data: User) => {
    const { result, errorText = '' } = await updateUser(data, id)
    if (result) {
      router.push('/admin/users');
      router.refresh();
      handleOpenNotification('会員情報を更新しました。', 'success')
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
            </Grid>
          </div>
          <div className="flex justify-center">
            <BackButton path={'/admin/users'} />
            <SubmitButton action_letter={action} />
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;