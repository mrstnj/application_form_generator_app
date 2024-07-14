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
import { searchCompany, deleteCompany } from "@/actions/company"

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

  const handleDeleteCompany = async (id: number) => {
    await deleteCompany(id)
    setCompanies(companies.filter((company) => company.id !== id));
    handleOpenNotification('企業情報を削除しました。', 'success')
  };

  const onSubmit = async (data: Company) => {
    const { result, response, errorText = '' } = await searchCompany(data)
    if (result) {
      setCompanies(response);
      if (response.length == 0) {
        handleOpenNotification('検索結果が0件でした。', 'info')
      }
    } else {
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<Company>();

  return (
    <>
      <Paper elevation={0} className="max-w-full mb-4">
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
            <SubmitButton action_letter={'検索'} />
          </div>
        </form>  
      </Paper>
      <Paper elevation={0} className="max-w-full mb-4">
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
                      <EditButton onClick={handleShowDetails} data={company.id} />
                      <DeleteButton onClick={handleDeleteCompany} data={company.id} />
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