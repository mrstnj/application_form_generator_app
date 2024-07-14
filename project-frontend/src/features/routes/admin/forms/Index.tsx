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
import { searchForm, deleteForm } from "@/actions/form";

type Form = {
  id: number;
  name: string;
};

interface Props {
  formsList: Form[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ formsList }: Props) => {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>(formsList);
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

  const handleShowDetails = (id?: number) => router.push(`/admin/forms/${id}`);

  const handleDeleteForm = async (id: number) => {
    await deleteForm(id)
    setForms(forms.filter((form) => form.id !== id));
    handleOpenNotification('フォーム情報を削除しました。', 'success')
  };

  const onSubmit = async (data: Form) => {
    const { result, response, errorText = '' } = await searchForm(data)
    if (result) {
      setForms(response);
      if (response.length == 0) {
        handleOpenNotification('検索結果が0件でした。', 'info')
      }
    } else {
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<Form>();

  return (
    <>
      <Paper elevation={0} className="max-w-full mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            フォーム検索
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="フォーム名"/>}
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
      <Paper elevation={0} className="max-w-full mb-4">
        <TableContainer className="p-8">
          <Typography variant="h6">
            フォーム一覧
          </Typography>    
          <Table align="center">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">フォーム名</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => {
                return (
                  <TableRow key={form.id}>
                    <TableCell>{form.name}</TableCell>
                    <TableCell>
                      <EditButton onClick={handleShowDetails} data={form.id} />
                      <DeleteButton onClick={handleDeleteForm} data={form.id} />
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