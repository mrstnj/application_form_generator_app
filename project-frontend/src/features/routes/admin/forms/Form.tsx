"use client";

import {
  Typography,
  Paper,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, useCallback } from "react";
import SubmitButton from "@/components/button/SubmitButton";
import BackButton from "@/components/button/BackButton";
import Notification from "@/components/notification/Notification";
import * as validators from "@/common/utils/validate";
import { updateForm } from "@/actions/form"
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SimpleSortableItem } from "./SimpleSortableItem";
import { Stack, Box } from "@mui/material";
import List from '@mui/material/List';

type Form = {
  id: number;
  name: string;
};

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  is_new: boolean;
  id?: number;
  form?: Form;
}

const INITIAL_ITEMS = [
  { id: crypto.randomUUID(), name: "ソータブルアイテム　A" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　B" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　C" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　D" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　E" }
];

const Form = ({ is_new, id, form }: Props) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Form>();

  const title = is_new ? "フォーム登録" : "フォーム詳細" ;
  const action = is_new ? "登録" : "更新" ;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    valiant: 'info' as Valiant
  })
  const handleOpenNotification = (message:string, valiant='error' as Valiant) =>{
    setNotification({
      open: true,
      message: message,
      valiant: valiant
    })
  }
  const handleCloseNotification = () => {
    setNotification(prevNotification => ({
      ...prevNotification,
      open: false
    }));
  };

  useEffect(() => {
    if (!is_new && form) {
      setValue("name", form.name);
    }
  }, [is_new, form, setValue]);

  const onSubmit = async (data: Form) => {
    const { result, errorText = '' } = await updateForm(is_new, data, id)
    if (result) {
      router.push('/admin/forms');
      router.refresh();
    } else {
      handleOpenNotification(errorText)
    }
  };

  const [items, setItems] = useState(INITIAL_ITEMS);

  return (
    <>
      <Paper elevation={0} className="sm:mx-auto sm:max-w-prose mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <Typography variant="h6">
            {title}
          </Typography>
          <div className="my-4">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: {
                        required: validators.required
                      }
                    }}
                    render={({ field }) => <TextField
                      {...field}
                      label="フォーム名"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <DndContext
                    collisionDetection={closestCenter} //中央を越えたら入れ替え
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
                          <SimpleSortableItem id={item.id} name={item.name} key={item.id} />
                        ))}
                      </List>
                    </SortableContext>
                  </DndContext>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <BackButton path={'/admin/forms'} />
            <SubmitButton action_letter={action}/>
          </div>
        </form>  
      </Paper>
      <Notification handleClose={handleCloseNotification} notification={notification} />
    </>
  );
};

export default Form;