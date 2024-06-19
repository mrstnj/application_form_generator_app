import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useForm,useFieldArray, Controller, useFormContext } from 'react-hook-form';
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
  initial_items: Form[];
}

const FormItemList = ({ initial_items }: Props) => {  
  const { register } = useFormContext();
  console.log(register)
  const { control } = useForm({
    defaultValues: {
      form_items: [{ name: "", type: "text", is_required: false }]
    }
  });
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "form_items"
  // });

  const [items, setItems] = useState(initial_items);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over == null || active.id === over.id) {
          return;
        }
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);
      }}
    >
      {/* 並び替え可能な要素のコレクションを管理するプロバイダーです。 */}
      <SortableContext items={items}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {items.map((item, index) => (
            <Controller
              key={item.id}
              name={`form_items[${index}]`}
              control={control}
              defaultValue={`item[${index}]`}
              render={({ field }) => (
                <SortableFormItem
                  {...field}
                  id={item.id}
                  name={item.name}
                />
              )}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default FormItemList;