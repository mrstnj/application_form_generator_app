"use client";

import {
  Typography,
  Paper,
  FormControl,
  Grid,
  TextField,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, MouseEvent } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updateUser } from "@/actions/user"

type FormItemAnswer = {
  name: string;
  value: string;
}

type Plan = {
  name: string;
}

type User = {
  id: number;
  email: string;
  plans: Plan[];
};

type UserPlan = {
  form_item_answers: FormItemAnswer[];
  plan: Plan;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  id: number;
  user?: User | null;
  user_plans: UserPlan[];
}

const Form = ({ id, user, user_plans }: Props) => {
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

  const [openPlan, setOpenPlan] = useState(false);

  const handleOpenPlan = () => {
    setOpenPlan(!openPlan);
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
          {user_plans.map((user_plan, index) => (
            <Paper elevation={3} className="sm:mx-auto sm:max-w-prose mb-4" key={index}>
              <ListItemButton onClick={handleOpenPlan}>
                <ListItemText primary={user_plan.plan.name} />
                {openPlan ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openPlan} timeout="auto" unmountOnExit>
                {user_plan.form_item_answers.map((form_item_answer, answerIndex) => (
                  <List component="div" disablePadding key={answerIndex}>
                    <ListItem sx={{ pl: 4 }}>
                      <Grid container >
                        <Grid item xs={6}>
                          <ListItemText primary={form_item_answer.name} />
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                          {form_item_answer.value}
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                ))}
              </Collapse>
            </Paper>
          ))}
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