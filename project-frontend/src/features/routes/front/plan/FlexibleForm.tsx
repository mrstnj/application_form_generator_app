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
  FormHelperText
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, useCallback } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updatePlan } from "@/actions/plan"
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";

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
  email: string;
  form_item_answer: FormItemAnswer[];
};

interface Props {
  form_item: FormItem;
  index: number;
  control: Control<User>;
}

const FlexibleForm = ({ form_item, index, control }: Props) => {

  return (
    <>
      <div className="my-4">
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name={`form_item_answer.${index}.value`}
                control={control}
                defaultValue=""
                rules={{
                  validate: {
                    required: validators.required
                  }
                }}
                render={({ field }) => <TextField
                  {...field}
                  label={form_item.name}
                  // error={Boolean(errors.name)}
                  // helperText={errors.name?.message}
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