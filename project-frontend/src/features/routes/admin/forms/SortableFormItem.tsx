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
import MenuIcon from '@mui/icons-material/Menu';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm, Controller } from 'react-hook-form';
import * as validators from "@/common/utils/validate";

type FormItem = {
  id: number,
  name: string;
  type: string;
  is_required: boolean;
};

type Props = {
  id: number;
  name: string;
};

const SortableFormItem: FC<Props> = ({ id, name }) => {
  const { control, formState: { errors } } = useForm<FormItem>();
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
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
        key={id}
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
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name="name"
                control={control}
                defaultValue={name}
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
                name="type"
                control={control}
                defaultValue=""
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