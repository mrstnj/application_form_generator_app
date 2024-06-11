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

type Service = {
  id: number;
  name: string;
  content: string;
  img?: string | Blob;
  status: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  service?: Service;
}

const Form = ({ is_new, id, service }: Props) => {
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
      setValue("name", service.name);
      setValue("content", service.content);
      setValue("status", service.status);
      if (service.img) {
        const blobImg = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service.img}`, { mode: 'cors' }).then((res) => res.blob());
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
    } else {
      handleOpenNotification(errorText)
    }
  };

  const watchImg = watch('img');

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