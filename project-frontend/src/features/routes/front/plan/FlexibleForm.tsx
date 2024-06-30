"use client";

import {
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { 
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import * as validators from "@/common/utils/validate";
import { Control } from "react-hook-form";
import 'dayjs/locale/ja';
import dayjs from 'dayjs';

type FormItem = {
  id: number;
  name: string;
  form_type: string;
  is_required: boolean;
};

type FormItemAnswer = {
  name: string;
  value: string;
};

type User = {
  email: string;
  form_item_answer: FormItemAnswer[];
};

interface Props {
  form_item: FormItem;
  index: number;
  control: Control<User>;
  errors: any;
}

const FlexibleForm = ({ form_item, index, control, errors }: Props) => {

  switch (form_item.form_type) {
  case "email":
    return (
      <div className="my-4">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  validate: {
                    ...(form_item.is_required && { required: validators.required }),
                    ...(form_item.form_type == 'email' && { pattern: validators.email}),
                  }
                }}
                render={({ field }) => <TextField
                  {...field}
                  label={form_item.name}
                  error={Boolean(errors?.email?.value)}
                  helperText={errors?.email?.value?.message}
                />}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  case "date":
    return (
      <div className="my-4">
        <Grid container spacing={3}>
          <Controller
            name={`form_item_answer.${index}.name`}
            control={control}
            defaultValue={form_item.name}
            render={({ field }) => <div {...field} />}
          />
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name={`form_item_answer.${index}.value`}
                control={control}
                rules={{
                  validate: {
                    ...(form_item.is_required && { required: validators.required }),
                  }
                }}
                render={({ field }) => 
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker 
                        {...field}
                        label={form_item.name} 
                        format="YYYY/MM/DD" 
                        value={field.value ? dayjs(field.value) : null}
                        onChange={ newValue => field.onChange(dayjs(newValue).format("YYYY/MM/DD"))}
                        slotProps={{
                          textField: {
                            error: Boolean(errors?.form_item_answer?.[index]?.value),
                            helperText: errors?.form_item_answer?.[index]?.value?.message,
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );  
  default:
    return (
      <div className="my-4">
        <Grid container spacing={3}>
          <Controller
            name={`form_item_answer.${index}.name`}
            control={control}
            defaultValue={form_item.name}
            render={({ field }) => <div {...field} />}
          />
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name={`form_item_answer.${index}.value`}
                control={control}
                defaultValue=""
                rules={{
                  validate: {
                    ...(form_item.is_required && { required: validators.required }),
                    ...(form_item.form_type == 'number' && { pattern: validators.number })
                  }
                }}
                render={({ field }) => <TextField
                  {...field}
                  label={form_item.name}
                  error={Boolean(errors?.form_item_answer?.[index]?.value)}
                  helperText={errors?.form_item_answer?.[index]?.value?.message}
                />}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default FlexibleForm;