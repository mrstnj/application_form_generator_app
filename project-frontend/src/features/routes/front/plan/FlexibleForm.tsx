"use client";

import {
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Controller } from 'react-hook-form';
import * as validators from "@/common/utils/validate";
import { Control } from "react-hook-form";

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
};

type User = {
  form_item_answer: FormItemAnswer[];
};

interface Props {
  form_item: FormItem;
  index: number;
  control: Control<User>;
  errors: any;
}

const FlexibleForm = ({ form_item, index, control, errors }: Props) => {

  return (
    <>
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
                  required: 'This field is required',
                }}
                render={({ field }) => <TextField
                  {...field}
                  label={form_item.name}
                  error={Boolean(errors[`form_item_answer.${index}.value`])}
                  helperText={errors[`form_item_answer.${index}.value`]?.message}
                />}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FlexibleForm;