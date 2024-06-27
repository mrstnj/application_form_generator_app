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
  id: number;
  form_item_id: number;
  value: string;
  date_value: Date;
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
console.log(errors)

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
                      required: validators.required,
                    }
                  }}
                  render={({ field }) => <TextField
                    {...field}
                    label={form_item.name}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
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
              {false &&
                <Controller
                  name={`form_item_answer.${index}.form_item_id`}
                  control={control}
                  defaultValue={form_item.id}
                  render={({ field }) => <TextField {...field} />}
                />
              }
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name={`form_item_answer.${index}.date_value`}
                    control={control}
                    rules={{
                      validate: {
                        required: validators.required,
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
                            onChange={(newValue) => field.onChange(newValue)}
                            slotProps={{
                              textField: {
                                error: Boolean(errors.form_item_answer?.[index]?.date_value),
                                helperText: errors.form_item_answer?.[index].date_value?.message,
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
            {false &&
              <Controller
                name={`form_item_answer.${index}.form_item_id`}
                control={control}
                defaultValue={form_item.id}
                render={({ field }) => <TextField {...field} />}
              />
            }
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name={`form_item_answer.${index}.value`}
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: {
                      required: validators.required,
                    }
                  }}
                  render={({ field }) => <TextField
                    {...field}
                    label={form_item.name}
                    error={Boolean(errors.form_item_answer?.[index]?.value)}
                    helperText={errors.form_item_answer?.[index]?.value?.message}
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