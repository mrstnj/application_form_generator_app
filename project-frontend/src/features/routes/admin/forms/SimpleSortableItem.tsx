import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

type Props = {
  id: string;
  name: string;
};

export const SimpleSortableItem: FC<Props> = ({ id, name }) => {
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
        <IconButton aria-label="menu">
          <MenuIcon />
        </IconButton>
        <ListItemText id={id} primary={name} />
      </ListItem>
      <Divider />
    </div>
  );
};