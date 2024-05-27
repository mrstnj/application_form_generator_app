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

type Company = {
  id: number;
  code: string;
  name: string;
  status: string;
};

interface Props {
  companiesList: Company[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ companiesList }: Props) => {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>(companiesList);
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

  const handleShowDetails = (id?: number) => router.push(`/admin/companies/${id}`);

  const deleteCompany = async (id: number) => {
    await axios.delete(`http://localhost:8080/companies/${id}`);
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const onSubmit = async (data: Company) => {
    try {
      const response = await axios.get('http://localhost:8080/companies', {
        params: data
      });
      setCompanies(response.data);
    } catch (error) {
      const errorText = errorHandle(error)
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<Company>();

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            企業検索
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="企業コード"/>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="企業名"/>}
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
            企業一覧
          </Typography>    
          <Table align="center">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">企業コード</TableCell>
                <TableCell className="font-bold">企業名</TableCell>
                <TableCell className="font-bold">ステータス</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => {
                return (
                  <TableRow key={company.id}>
                    <TableCell>{company.code}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.status == "activate" ? '有効' : '無効'}</TableCell>
                    <TableCell>
                      <EditButton params={{onClick: handleShowDetails, data: company.id}} />
                      <DeleteButton params={{onClick: deleteCompany, data: company.id}} />
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