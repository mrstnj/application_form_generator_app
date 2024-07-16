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
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, useCallback } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updateService } from "@/actions/service"
import MyDropzone from '@/components/dropzone/MyDropzone';
import { useCurrentUser } from '@/contexts/currentUserContext';

type Service = {
  id: number;
  company_id?: number;
  company?: Company;
  code: string;
  name: string;
  content: string;
  img?: string | Blob;
  status: string;
};

type Company = {
  id: number;
  name: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  service?: Service;
  companies?: Company[];
}

const Form = ({ is_new, id, service, companies }: Props) => {
  const { current_user } = useCurrentUser();
  const router = useRouter();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Service>();

  const title = is_new ? "サービス登録" : "サービス詳細" ;
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

  const fetchData = useCallback(async () => {
    if (!is_new && service) {
      setValue("company_id", service.company?.id);
      setValue("code", service.code);
      setValue("name", service.name);
      setValue("content", service.content);
      setValue("status", service.status);
      if (service.img) {
        const blobImg = await fetch(`${service.img}`, { mode: 'cors' }).then((res) => res.blob());
        setValue("img", blobImg);
      }
    }
  }, [is_new, service, setValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (data: Service) => {
    if (data.img instanceof Blob) {
      delete data.img;
    }
    const { result, errorText = '' } = await updateService(is_new, data, id)
    if (result) {
      router.push('/admin/services');
      router.refresh();
      const commit_message = is_new ? "サービス情報を登録しました。" : "サービス情報を更新しました。"
      handleOpenNotification(commit_message, 'success')
    } else {
      handleOpenNotification(errorText)
    }
  };

  const watchImg = watch('img');

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
                      label="サービスコード"
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
                      label="サービス名"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="content"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField
                      {...field}
                      label="サービス内容"
                      multiline
                      rows={4}
                      error={Boolean(errors.content)}
                      helperText={errors.content?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom style={{ color: '#757575' }}>
                  サービス画像
                </Typography>
                <FormControl fullWidth>
                  <Controller
                    name="img"
                    control={control}
                    defaultValue=""
                    render={() => <MyDropzone 
                      setValue={setValue}
                      watchImg={watchImg}
                      text="Drag and drop an image file here or click"
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
            <BackButton path={'/admin/services'} />
            <SubmitButton action_letter={action}/>
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;