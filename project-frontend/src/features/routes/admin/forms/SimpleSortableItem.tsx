import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

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
        secondaryAction={
          <IconButton edge="end" aria-label="comments">
            <CommentIcon />
          </IconButton>
        }
        disablePadding
      >
          <ListItemText id={id} primary={name} />
      </ListItem>
      {/* <Box
        sx={{
          border: "1px solid black",
          p: 2,
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <Box sx={{ ml: 2 }}>{name}</Box>
      </Box> */}
    </div>
  );
};