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
import { searchPlan, deletePlan } from "@/actions/plan"

type Service = {
  name: string;
};

type Plan = {
  id: number;
  service: Service;
  name: string;
  status: string;
};

type PlanParams = {
  service: string;
  name: string;
  status: string;
}

interface Props {
  services: Service[];
  plansList: Plan[];
}

type Valiant = 'success' | 'warning' | 'error' | 'info';

const Index = ({ plansList, services }: Props) => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>(plansList);
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

  const handleShowDetails = (id?: number) => router.push(`/admin/plans/${id}`);

  const handleDeletePlan = async (id: number) => {
    await deletePlan(id)
    setPlans(plans.filter((plan) => plan.id !== id));
    handleOpenNotification('プラン情報を削除しました。', 'success')
  };

  const onSubmit = async (data: PlanParams) => {
    const { result, response, errorText = '' } = await searchPlan(data)
    if (result) {
      setPlans(response);
      if (response.length == 0) {
        handleOpenNotification('検索結果が0件でした。', 'info')
      }
    } else {
      handleOpenNotification(errorText)
    }
  };

  const { control, handleSubmit } = useForm<PlanParams>();

  return (
    <>
      <Paper elevation={0} className="max-w-full mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            プラン検索
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="service"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>サービス</InputLabel>
                        <Select {...field} label="ステータス">
                          {services.map((service, index) => (
                            <MenuItem key={index} value={service.name}>{service.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="プラン名"/>}
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
            プラン一覧
          </Typography>    
          <Table align="center">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">サービス名</TableCell>
                <TableCell className="font-bold">プラン名</TableCell>
                <TableCell className="font-bold">ステータス</TableCell>
                <TableCell className="font-bold">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => {
                return (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.service.name}</TableCell>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell>{plan.status == "activate" ? '有効' : '無効'}</TableCell>
                    <TableCell>
                      <EditButton onClick={handleShowDetails} data={plan.id} />
                      <DeleteButton onClick={handleDeletePlan} data={plan.id} />
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