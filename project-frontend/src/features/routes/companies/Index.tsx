"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm, Controller } from 'react-hook-form';

import axios from "axios";
import { useEffect, useState } from "react";

type Company = {
  id: number;
  code: string;
  name: string;
  status: string;
};

const Index = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/companies")
      .then((res) => res.json())
      .then((companies) => setCompanies(companies));
  }, []);

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
      // TODO: エラーメッセージ「条件に一致するデータがありませんでした」を出す
      console.error('APIリクエストエラー:', error);
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
            <Button variant="contained" color="primary" size="large" type="submit">
              検索
            </Button>
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
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={() => handleShowDetails(company.id)}
                        className="m-2"
                      >
                        <VisibilityIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="medium"
                        onClick={() => deleteCompany(company.id)}
                        className="m-2"
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Index;