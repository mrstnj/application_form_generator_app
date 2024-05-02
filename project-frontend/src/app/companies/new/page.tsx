"use client";

import {
  Button,
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

import axios from "axios";

type Company = {
  id: number;
  code: string;
  name: string;
  status: number | "";
};

const CompanyEdit = () => {
  const router = useRouter();

  const onSubmit = async (data: Company) => {
    try {
      await axios.post('http://localhost:8080/companies', {
        company: data
      });
      router.push('/companies');
    } catch (error) {
      // TODO: エラーメッセージ「条件に一致するデータがありませんでした」を出す
      console.error('APIリクエストエラー:', error);
    }
  };

  const { control, handleSubmit } = useForm<Company>();

  return (
    <>
      <Typography variant="h4" align="center">
        Company List
      </Typography>    
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            企業登録
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
                          <MenuItem value={1}>有効</MenuItem>
                          <MenuItem value={0}>無効</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <Button variant="contained" color="primary" size="large" type="submit">
              登録
            </Button>
          </div>
        </form>  
      </Paper>
    </>
  );
};

export default CompanyEdit;