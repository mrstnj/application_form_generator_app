import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  ListItem,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Control, Controller } from 'react-hook-form';
import * as validators from "@/common/utils/validate";

type FormItem = {
  id: number,
  name: string;
  type: string;
  is_required: boolean;
};

type Form = {
  id: number;
  name: string;
  form_items: FormItem[];
};

type Props = {
  field: any;
  index: number;
  control: Control<Form>;
};

const SortableFormItem: FC<Props> = ({ field, index, control }) => {
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
          height: 60, // 適切な高さをピクセルで指定
        }}
        secondaryAction={
          <IconButton edge="end" aria-label="comments">
            <RemoveCircleIcon />
          </IconButton>
        }
        disablePadding
      >
        <Grid container>
          <Grid item xs={1}>
            <IconButton 
              aria-label="menu"
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <DragIndicatorIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name={`form_items.${index}.name`}
                control={control}
                defaultValue={`field.${index}.name`}
                render={({ field }) => <TextField
                  {...field}
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Controller
                name={`form_items.${index}.type`}
                control={control}
                defaultValue={`form_items.${index}.type`}
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
                    >
                      <MenuItem value="text">テキスト</MenuItem>
                      <MenuItem value="number">数字</MenuItem>
                      <MenuItem value="email">メールアドレス</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};

export default SortableFormItem;