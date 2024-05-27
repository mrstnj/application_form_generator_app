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

type Company = {
  id: number;
  code: string;
  name: string;
  status: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  company?: Company | null;
}

const Form = ({ is_new, id, company = null }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Company>();

  const title = is_new ? "企業登録" : "企業詳細" ;
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
    if (!is_new && company) {
      setValue("code", company.code);
      setValue("name", company.name);
      setValue("status", company.status);
    }
  }, [is_new, company, setValue]);

  const onSubmit = async (data: Company) => {
    try {
      if (is_new) {
        await axios.post('http://localhost:8080/companies', {
          company: data
        }); 
      } else {
        await axios.put(`http://localhost:8080/companies/${id}`, {
          company: data
        });
      }
      router.push('/admin/companies');
      router.refresh();
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
                        required: validators.required,
                        pattern: validators.code
                      }
                    }}
                    render={({ field }) => <TextField 
                      {...field}
                      label="企業コード"
                      error={Boolean(errors.code)}
                      helperText={errors.code?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="企業名"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
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
            <BackButton path={'/admin/companies'} />
            <SubmitButton action_letter={action}/>
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;