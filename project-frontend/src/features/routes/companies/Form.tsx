"use client";

import {
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
import { useEffect, useState } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";

type Company = {
  id: number;
  code: string;
  name: string;
  status: string;
};

type Params = {
  params: {
    new: boolean;
    id?: number;
  }
}

const Form = ({ params }: Params) => {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const { control, handleSubmit, setValue } = useForm<Company>();

  const title = params.new ? "企業登録" : "企業詳細" ;
  const action = params.new ? "登録" : "更新" ;

  useEffect(() => {
    if (!params.new) {
      fetch(`http://localhost:8080/companies/${params.id}`)
        .then((res) => res.json())
        .then((company) => setCompany(company));
    }
  }, [params.new, params.id]);

  useEffect(() => {
    if (!params.new && company) {
      setValue("code", company.code);
      setValue("name", company.name);
      setValue("status", company.status);
    }
  }, [params.new, company, setValue]);

  const onSubmit = async (data: Company) => {
    try {
      if (params.new) {
        await axios.post('http://localhost:8080/companies', {
          company: data
        }); 
      } else {
        await axios.put(`http://localhost:8080/companies/${params.id}`, {
          company: data
        });
      }
      router.push('/admin/companies');
    } catch (error) {
      // TODO: エラーメッセージ「条件に一致するデータがありませんでした」を出す
      console.error('APIリクエストエラー:', error);
    }
  };

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            {title}
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
            <BackButton params={{path: '/admin/companies'}}/>
            <SubmitButton params={{action_letter: action}}/>
          </div>
        </form>  
      </Paper>
    </>
  );
};

export default Form;