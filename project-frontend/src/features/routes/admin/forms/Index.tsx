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
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import EditButton from "@/components/button/EditButton";
import DeleteButton from "@/components/button/DeleteButton";
import Notification from "@/components/notification/Notification";
import { searchForm, deleteForm } from "@/actions/form";
import { useCurrentUser } from '@/contexts/currentUserContext';

type Company = {
  name: string;
}

type Form = {
  company: Company;
  company_name: string;
  id: number;
  name: string;
};

interface Props {
  formsList: Form[];
  companies: Company[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ formsList, companies }: Props) => {
  const { current_user } = useCurrentUser();
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
              { current_user.is_super_admin &&
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="company_name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>企業</InputLabel>
                          <Select {...field} label="企業">
                            {companies.map((company, index) => (
                              <MenuItem key={index} value={company.name}>{company.name}</MenuItem>
                            ))}
                          </Select>
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
                {current_user.is_super_admin &&
                  <TableCell className="font-bold">企業名</TableCell>
                }
                <TableCell className="font-bold">フォーム名</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => {
                return (
                  <TableRow key={form.id}>
                    { current_user.is_super_admin &&
                      <TableCell>{form.company.name}</TableCell>
                    }
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