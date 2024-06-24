"use client";

import {useState, SyntheticEvent, ReactNode} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ServiceCard from './ServiceCard'
import Grid from '@mui/material/Grid';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

type Service = {
  id: number;
  code: string;
  name: string;
  content: string;
  img: string;
};

interface Props {
  services: Service[];
  company_code: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Content = ({ services, company_code }: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3} className='m-5'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="サービス一覧" {...a11yProps(0)} />
          {/* <Tab label="お知らせ一覧" {...a11yProps(1)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <ServiceCard service={service} company_code={company_code} key={index}/>
        ))}
        </Grid>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel> */}
    </Paper>
  );
}

export default Content;