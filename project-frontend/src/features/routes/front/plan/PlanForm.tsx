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
import FlexibleForm from "./FlexibleForm";

type FormItemAnswer = {
  id: number;
  form_item_id: number;
  value: string;
};

type User = {
  email: string;
  form_item_answer: FormItemAnswer[];
};

type FormItem = {
  id: number;
  name: string;
  form_type: string;
  is_required: boolean;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  form_items: FormItem[];
}

const PlanForm = ({ form_items }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<User>();

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

  const onSubmit = async (data: User) => {
    // const { result, errorText = '' } = await updatePlan(is_new, data, id)
    // if (result) {
    //   router.push('/admin/plans');
    //   router.refresh();
    // } else {
    //   handleOpenNotification(errorText)
    // }
  };

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {form_items.map((form_item, index) => {
            return (
              <FlexibleForm key={index} form_item={form_item} index={index} control={control}/>
            )
          })}
          <div className="flex justify-center">
            <BackButton path={'/admin/plans'} />
            <SubmitButton action_letter="送信"/>
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default PlanForm;