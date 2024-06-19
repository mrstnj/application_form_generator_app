import { useEffect, useState, useCallback } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortableFormItem from "./SortableFormItem";
import List from '@mui/material/List';

type Form = {
  id: number;
  name: string;
};

interface Props {
  initial_items: Form[];
}

const FormItemList = ({ initial_items }: Props) => {  

  const [items, setItems] = useState(initial_items);

  return (
    <DndContext
      collisionDetection={closestCenter} //中央を越えたら入れ替え
      modifiers={[restrictToVerticalAxis]}
      //ドラッグアイテムがドロップされた後に発火するイベントハンドラ
      // active：動かしたコンポーネントの移動開始時の状態
      // over：移動終了時の状態
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
          {items.map((item) => (
            <SortableFormItem id={item.id} name={item.name} key={item.id} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default FormItemList;