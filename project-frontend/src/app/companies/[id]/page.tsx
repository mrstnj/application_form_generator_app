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
import { useEffect, useState } from "react";

type Company = {
  id: number;
  code: string;
  name: string;
  status: string;
};

type Params = {
  params: {
    id: number;
  }
}


const CompanyEdit = ({ params }: Params) => {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const { control, handleSubmit, setValue } = useForm<Company>();

  useEffect(() => {
    fetch(`http://localhost:8080/companies/${params.id}`)
      .then((res) => res.json())
      .then((company) => setCompany(company));
  }, [params.id]);

  useEffect(() => {
    if (company) {
      setValue("code", company.code);
      setValue("name", company.name);
      setValue("status", company.status);
    }
  }, [company, setValue]);

  const onSubmit = async (data: Company) => {
    try {
      await axios.put(`http://localhost:8080/companies/${params.id}`, {
        company: data
      });
      router.push('/companies');
    } catch (error) {
      // TODO: エラーメッセージ「条件に一致するデータがありませんでした」を出す
      console.error('APIリクエストエラー:', error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Company List
      </Typography>    
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            企業詳細
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
            <Button variant="contained" color="primary" size="large" className="m-1" onClick={() => router.push('/companies')}>
              戻る
            </Button>
            <Button variant="contained" color="primary" size="large" type="submit" className="m-1">
              更新
            </Button>
          </div>
        </form>  
      </Paper>
    </>
  );
};

export default CompanyEdit;