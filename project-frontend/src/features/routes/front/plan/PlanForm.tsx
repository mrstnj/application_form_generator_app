"use client";

import {
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { useState } from "react";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import FlexibleForm from "./FlexibleForm";

type FormItemAnswer = {
  id: number;
  form_item_id: number;
  value: string;
  date_value: Date;
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
  company_code: string;
  service_code: string;
  form_items: FormItem[];
}

const PlanForm = ({ company_code, service_code, form_items }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<User>();

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

  const onSubmit = (data: User) => {
    console.log("送信")
    console.log(data)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <Typography variant="body2" gutterBottom className='pt-5'>
          申込をする場合は下記フォームを入力の上送信してください。
        </Typography>
        {form_items.map((form_item, index) => {
          return (
            <FlexibleForm key={index} form_item={form_item} index={index} control={control} errors={errors} />
          )
        })}
        <div className="flex justify-center">
          <BackButton path={`/front/${company_code}/${service_code}`} />
          <Button variant="contained" className="bg-green-500 m-2 hover:bg-green-600" size="large" type="submit">
            送信
          </Button>
        </div>
      </form>  
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default PlanForm;