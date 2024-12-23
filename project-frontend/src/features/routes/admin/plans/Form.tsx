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
import { updatePlan } from "@/actions/plan"

type Service = {
  id: number;
  name: string;
};

type Form = {
  id: number;
  name: string;
};

type Plan = {
  id: number;
  service_id: number;
  name: string;
  content: string;
  form_id: number;
  status: string;
  service: Service;
  form: Form;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  services: Service[];
  forms: Form[];
  id?: number;
  plan?: Plan;
}

const Form = ({ is_new, services, forms, id, plan }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Plan>();

  const title = is_new ? "プラン登録" : "プラン詳細" ;
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
    if (!is_new && plan) {
      setValue("service_id", plan.service.id);
      setValue("name", plan.name);
      setValue("content", plan.content);
      setValue("form_id", plan.form?.id);
      setValue("status", plan.status);
    }
  }, [is_new, plan, setValue]);

  const onSubmit = async (data: Plan) => {
    const { result, errorText = '' } = await updatePlan(is_new, data, id)
    if (result) {
      router.push('/admin/plans');
      router.refresh();
      const commit_message = is_new ? "プラン情報を登録しました。" : "プラン情報を更新しました。"
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="service_id"
                    control={control}
                    defaultValue={services[0].id}
                    rules={{
                      validate: {
                        required: validators.required,
                      }
                    }}
                    render={({ field }) => (
                      <FormControl fullWidth error={Boolean(errors.service_id)}>
                        <InputLabel>サービス名</InputLabel>
                        <Select
                          {...field}
                          label="サービス名"
                        >
                          {services.map((service, index) => (
                            <MenuItem key={index} value={service.id}>{service.name}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.service_id?.message}</FormHelperText>
                      </FormControl>
                    )}
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
                      label="プラン名"
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
                      label="プラン内容"
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
                    name="form_id"
                    control={control}
                    defaultValue={0}
                    rules={{
                      validate: {
                        required: validators.required,
                      }
                    }}
                    render={({ field }) => (
                      <FormControl fullWidth error={Boolean(errors.form_id)}>
                        <InputLabel>フォーム名</InputLabel>
                        <Select
                          {...field}
                          label="フォーム名"
                        >
                          <MenuItem value={0}>デフォルト</MenuItem>
                          {forms.map((form, index) => (
                            <MenuItem key={index} value={form.id}>{form.name}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.form_id?.message}</FormHelperText>
                      </FormControl>
                    )}
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
            <BackButton path={'/admin/plans'} />
            <SubmitButton action_letter={action}/>
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;