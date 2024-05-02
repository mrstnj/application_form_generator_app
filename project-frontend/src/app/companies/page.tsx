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
  Box,
  Modal,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import axios from "axios";
import { useEffect, useState } from "react";

type Company = {
  id: number;
  code: string;
  name: string;
  status: number | "";
};

const CompanyIndex = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/companies")
      .then((res) => res.json())
      .then((companies) => setCompanies(companies));
  }, []);

  const selectedCompany = companies.find((company) => company.id === selectedCompanyId);

  const handleShowDetails = (id?: number) => setSelectedCompanyId(id || null);

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
      <Typography variant="h4" align="center">
        Company List
      </Typography>    
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
                <TableCell className="font-bold" colSpan={2}>アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => {
                return (
                  <TableRow key={company.id}>
                    <TableCell>{company.code}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.status? '有効' : '無効'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleShowDetails(company.id)}
                      >
                        SHOW
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => deleteCompany(company.id)}
                      >
                        DESTROY
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {selectedCompany && (
        <Modal open>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "lightblue",
              p: 4,
              borderRadius: "0.5em",
            }}
          >
            <Box component="p">ID: {selectedCompany.id}</Box>
            <Box component="p">Title: {selectedCompany.name}</Box>
            <Button onClick={() => handleShowDetails()} variant="contained">
              Close ✖️
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CompanyIndex;