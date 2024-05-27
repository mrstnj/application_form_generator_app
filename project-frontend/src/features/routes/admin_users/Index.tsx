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
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import EditButton from "@/components/button/EditButton";
import DeleteButton from "@/components/button/DeleteButton";
import Notification from "@/components/notification/Notification";
import { errorHandle } from "@/common/utils/errorHandle";

type AdminUser = {
  id: number;
  code: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
};

interface Props {
  adminUsersList: AdminUser[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ adminUsersList }: Props) => {
  const router = useRouter();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(adminUsersList);
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

  const handleShowDetails = (id?: number) => router.push(`/admin/admin_users/${id}`);

  const deleteCompany = async (id: number) => {
    await axios.delete(`http://localhost:8080/admin_users/${id}`);
    setAdminUsers(adminUsers.filter((admin_user) => admin_user.id !== id));
  };

  const onSubmit = async (data: AdminUser) => {
    try {
      const response = await axios.get('http://localhost:8080/admin_users', {
        params: data
      });
      setAdminUsers(response.data);
    } catch (error) {
      const errorText = errorHandle(error)
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<AdminUser>();

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            管理者検索
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="管理者コード"/>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="last_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="姓"/>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="first_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="名"/>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>ステータス</InputLabel>
                        <Select {...field} label="ステータス">
                          <MenuItem value="">選択してください</MenuItem>
                          <MenuItem value="activate">有効</MenuItem>
                          <MenuItem value="deactivate">無効</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <SubmitButton params={{action_letter: '検索'}}/>
          </div>
        </form>  
      </Paper>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <TableContainer className="p-8">
          <Typography variant="h6">
            管理者一覧
          </Typography>    
          <Table align="center">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">管理者コード</TableCell>
                <TableCell className="font-bold">姓</TableCell>
                <TableCell className="font-bold">名</TableCell>
                <TableCell className="font-bold">ステータス</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminUsers.map((admin_user) => {
                return (
                  <TableRow key={admin_user.id}>
                    <TableCell>{admin_user.code}</TableCell>
                    <TableCell>{admin_user.last_name}</TableCell>
                    <TableCell>{admin_user.first_name}</TableCell>
                    <TableCell>{admin_user.status == "activate" ? '有効' : '無効'}</TableCell>
                    <TableCell>
                      <EditButton params={{onClick: handleShowDetails, data: admin_user.id}} />
                      <DeleteButton params={{onClick: deleteCompany, data: admin_user.id}} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Notification params={{handleClose: handleCloseNotification, notification: notification}} />
    </>
  );
};

export default Index;