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
import { searchService, deleteService } from "@/actions/service"
import { useCurrentUser } from '@/contexts/currentUserContext';

type Company = {
  name: string;
}

type Service = {
  id: number;
  company: Company;
  company_name: string;
  name: string;
  status: string;
};

interface Props {
  servicesList: Service[];
  companies: Company[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ servicesList, companies }: Props) => {
  const { current_user } = useCurrentUser();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(servicesList);
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

  const handleShowDetails = (id?: number) => router.push(`/admin/services/${id}`);

  const handleDeleteService = async (id: number) => {
    await deleteService(id)
    setServices(services.filter((service) => service.id !== id));
    handleOpenNotification('サービス情報を削除しました。', 'success')
  };

  const onSubmit = async (data: Service) => {
    const { result, response, errorText = '' } = await searchService(data)
    if (result) {
      setServices(response);
      if (response.length == 0) {
        handleOpenNotification('検索結果が0件でした。', 'info')
      }
    } else {
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<Service>();

  return (
    <>
      <Paper elevation={0} className="max-w-full mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            サービス検索
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
                    render={({ field }) => <TextField {...field} label="サービス名"/>}
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
            サービス一覧
          </Typography>    
          <Table align="center">
            <TableHead>
              <TableRow>
                {current_user.is_super_admin &&
                  <TableCell className="font-bold">企業名</TableCell>
                }
                <TableCell className="font-bold">サービス名</TableCell>
                <TableCell className="font-bold">ステータス</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => {
                return (
                  <TableRow key={service.id}>
                    { current_user.is_super_admin &&
                      <TableCell>{service.company.name}</TableCell>
                    }
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.status == "activate" ? '有効' : '無効'}</TableCell>
                    <TableCell>
                      <EditButton onClick={handleShowDetails} data={service.id} />
                      <DeleteButton onClick={handleDeleteService} data={service.id} />
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