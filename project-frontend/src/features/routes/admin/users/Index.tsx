"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import EditButton from "@/components/button/EditButton";
import DeleteButton from "@/components/button/DeleteButton";
import Notification from "@/components/notification/Notification";
import { searchUser, deleteUser } from "@/actions/user"

type Service = {
  name: string;
};

type Plan = {
  id: number;
  name: string;
  service: Service;
};

type User = {
  id: number;
  email: string;
};

type UserParams = {
  plan: string;
}

interface Props {
  usersList: User[];
  plans: Plan[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ usersList, plans }: Props) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(usersList);
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

  const handleShowDetails = (id?: number) => router.push(`/admin/users/${id}`);

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
    setUsers(users.filter((user) => user.id !== id));
    handleOpenNotification('会員情報を削除しました。', 'success')
  };

  const onSubmit = async (data: UserParams) => {
    const { result, response, errorText = '' } = await searchUser(data)
    if (result) {
      setUsers(response);
      if (response.length == 0) {
        handleOpenNotification('検索結果が0件でした。', 'info')
      }
    } else {
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<UserParams>();

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            会員検索
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="plan"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>プラン</InputLabel>
                        <Select {...field} label="ステータス">
                          {plans.map((plan, index) => (
                            <MenuItem key={index} value={plan.name}>{plan.service.name}-{plan.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <SubmitButton action_letter={'検索'} />
          </div>
        </form>  
      </Paper>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <TableContainer className="p-8">
          <Typography variant="h6">
            会員一覧
          </Typography>    
          <Table align="center">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">メールアドレス</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <EditButton onClick={handleShowDetails} data={user.id} />
                      <DeleteButton onClick={handleDeleteUser} data={user.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Index;