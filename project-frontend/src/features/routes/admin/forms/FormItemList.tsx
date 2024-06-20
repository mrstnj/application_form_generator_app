import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Control, useFieldArray } from "react-hook-form";
import List from '@mui/material/List';
import SortableFormItem from "./SortableFormItem";

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

interface Props {
  control: Control<Form>;
}

const FormItemList = ({ control }: Props) => {
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: "form_items",
  });

  return (
    <DndContext
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
      {/* 並び替え可能な要素のコレクションを管理するプロバイダーです。 */}
      <SortableContext items={fields}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {fields.map((field, index) => (
            <SortableFormItem
              key={index}
              field={field}
              index={index}
              control={control}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default FormItemList;