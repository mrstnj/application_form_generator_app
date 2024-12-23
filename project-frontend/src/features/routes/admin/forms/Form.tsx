"use client";

import {
  Typography,
  Paper,
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updateForm } from "@/actions/form"
import FormItemList from "./components/FormItemList"
import { useCurrentUser } from '@/contexts/currentUserContext';

type FormItem = {
  id?: number;
  name: string;
  form_type: string;
  is_required: boolean;
  _destroy: boolean;
};

type Company = {
  id: number;
  name: string;
};

type Form = {
  id: number;
  company_id?: number;
  company?: Company;
  name: string;
  form_items_attributes: FormItem[];
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  form?: Form;
  companies?: Company[];
}

const Form = ({ is_new, id, form, companies }: Props) => {
  const { current_user } = useCurrentUser();
  const router = useRouter();
  const defaultValue = { name: "メールアドレス", form_type: "email", is_required: true, _destroy: false };
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Form>({
    defaultValues: {
      form_items_attributes: form?.form_items_attributes || [defaultValue],
    },
  });

  const title = is_new ? "フォーム登録" : "フォーム詳細" ;
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
    if (!is_new && form) {
      setValue("company_id", form.company?.id);
      setValue("name", form.name);
    }
  }, [is_new, form, setValue]);

  const onSubmit = async (data: Form) => {
    const { result, errorText = '' } = await updateForm(is_new, data, id)
    if (result) {
      router.push('/admin/forms');
      router.refresh();
      const commit_message = is_new ? "フォーム情報を登録しました。" : "フォーム情報を更新しました。"
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
                      label="フォーム名"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormItemList
                    control={control}
                    watch={watch}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <BackButton path={'/admin/forms'} />
            <SubmitButton action_letter={action}/>
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;