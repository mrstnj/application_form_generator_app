'use server'
 
import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type FormItem = {
  name: string;
  form_type: string;
  is_required: boolean;
  position?: number;
  _destroy: boolean;
};

type Form = {
  company_id?: number;
  name: string;
  form_items_attributes: FormItem[];
};

type FormParams = {
  name: string;
}

export async function updateForm(is_new: boolean, data: Form, id?: number) {
  data.form_items_attributes.filter(item => !item._destroy).forEach((item, index) => {
    item.position = index + 1;
  });
  const accessToken = cookies().get('accessToken');
  const url = is_new ? `${process.env.API_BASE_URL}/forms` : `${process.env.API_BASE_URL}/forms/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: accessToken ? {
        'AccessToken': `${accessToken.value}`,
        'Content-Type': 'application/json'
      } : {},
      body: JSON.stringify({form: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function searchForm(data: FormParams) {
  const accessToken = cookies().get('accessToken');
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`${process.env.API_BASE_URL}/forms?${params}`, {
      headers: accessToken ? {
        'AccessToken': `${accessToken.value}`
      } : {}
    });
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true, response };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function deleteForm(id: number) {
  const accessToken = cookies().get('accessToken');
  await fetch(`${process.env.API_BASE_URL}/forms/${id}`, {
    method: 'DELETE',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  });
}