import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import {
  List,
  ListItem,
  Grid,
  Divider,
  IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SortableFormItem from "./SortableFormItem";

type FormItem = {
  id?: number,
  name: string;
  form_type: string;
  is_required: boolean;
  _destroy: boolean;
};

type Form = {
  id: number;
  name: string;
  form_items_attributes: FormItem[];
};

interface Props {
  control: Control<Form>;
  watch: UseFormWatch<Form>;
}

const FormItemList = ({ control, watch }: Props) => {
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: "form_items_attributes",
  });

  return (
    <>
      <DndContext
        id="unique-dnd-context-id"
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over == null || active.id === over.id) {
            return;
          }
          const oldIndex = fields.findIndex((field) => field.id === active.id);
          const newIndex = fields.findIndex((field) => field.id === over.id);
          move(oldIndex, newIndex)
        }}
      >
        <SortableContext items={fields}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem
              sx={{
                height: 40,
              }}
              disablePadding
            >
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={1} />
                <Grid item xs={6} sx={{ fontSize: '14px' }}>
                  フォーム項目名
                </Grid>
                <Grid item xs={3} sx={{ fontSize: '14px' }}>
                  フォーム項目種別
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '14px' }}>
                  必須
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </ListItem>
            <Divider />
            {fields.map((field, index) => (
              <div key={index}>
                {!watch(`form_items_attributes.${index}._destroy`) &&
                  <SortableFormItem
                    key={field.id}
                    field={field}
                    control={control}
                    index={index}
                    remove={remove}
                    watch={watch}
                  />
                }
              </div>
            ))}
          </List>
        </SortableContext>
      </DndContext>
      <ListItem
        sx={{
          height: 40,
        }}
        disablePadding
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1}>
            <IconButton onClick={() => append({ name: '', form_type: '', is_required: false, _destroy: false })}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11} sx={{ fontSize: '14px' }}>
            フォーム項目を追加
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default FormItemList;