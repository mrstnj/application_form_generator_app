import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  ListItem,
  Box,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField,
  Checkbox 
} from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Control, Controller, FieldArrayWithId, UseFormWatch } from 'react-hook-form';
import * as validators from "@/common/utils/validate";

type FormItem = {
  id?: number,
  name: string;
  form_type: string;
  is_required: boolean;
};

type Form = {
  id: number;
  name: string;
  form_items_attributes: FormItem[];
};

type Props = {
  field: FieldArrayWithId<FormItem>;
  control: Control<Form>;
  index: number;
  remove: (arg0: number) => void;
  watch: UseFormWatch<Form>;
};

const SortableFormItem: FC<Props> = ({ field, control, index, remove, watch }) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
    >
      <ListItem
        key={field.id}
        sx={{
          height: 60,
        }}
        disablePadding
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            <Box
              aria-label="menu"
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <DragIndicatorIcon
                sx={{
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name={`form_items_attributes.${index}.name`}
                control={control}
                render={({ field }) => <TextField
                  {...field}
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  disabled={field.value === "メールアドレス"}
                />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Controller
                name={`form_items_attributes.${index}.form_type`}
                control={control}
                rules={{
                  validate: {
                    required: validators.required,
                  }
                }}
                render={({ field }) => (
                  <FormControl fullWidth variant="standard">
                    <Select
                      {...field}
                      label="フォーム種別"
                      disabled={watch(`form_items_attributes.${index}.name`) === "メールアドレス"}
                    >
                      <MenuItem value="text">テキスト</MenuItem>
                      <MenuItem value="number">数字</MenuItem>
                      <MenuItem value="date">日付</MenuItem>
                      <MenuItem value="email">メールアドレス</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <FormControl fullWidth>
              <Controller
                name={`form_items_attributes.${index}.is_required`}
                control={control}
                render={({ field }) => <Checkbox 
                  {...field}
                  size="small"
                  checked={field.value}
                  disabled={watch(`form_items_attributes.${index}.name`) === "メールアドレス"}
                />}                
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            {watch(`form_items_attributes.${index}.name`) !== "メールアドレス" &&
              <IconButton edge="end" aria-label="comments" color="error" onClick={() => remove(index)}>
                <RemoveCircleIcon />
              </IconButton>
            }
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};

export default SortableFormItem;