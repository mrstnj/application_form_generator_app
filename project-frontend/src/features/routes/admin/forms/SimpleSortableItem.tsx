import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm, Controller } from 'react-hook-form';

type Props = {
  id: string;
  name: string;
};

type Form = {
  id: number;
  name: string;
};

export const SimpleSortableItem: FC<Props> = ({ id, name }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Form>();
  const {
    setNodeRef,
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
      {...attributes}
      {...listeners}
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
            <IconButton aria-label="menu">
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
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};