'use server'

import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type FormItemAnswer = {
  name: string;
  value: string;
};

type User = {
  email: string;
  form_item_answer: FormItemAnswer[];
};

export async function createUser(data: User) {
  const url = `${process.env.API_BASE_URL}/users`;
  const method = 'POST';
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

// export async function searchUser(data: User) {
//   const accessToken = cookies().get('accessToken');
//   try {
//     const params = new URLSearchParams(data);
//     const res = await fetch(`${process.env.API_BASE_URL}/users?${params}`, {
//       headers: accessToken ? {
//         'AccessToken': `${accessToken.value}`
//       } : {}
//     });
//     const response = await res.json();
//     if (!res.ok) throw new Error(response.err);
//     return { result: true, response };
//   } catch (error: any) {
//     const errorText = errorHandle(error.message)
//     return { result: false, errorText };
//   }
// }

// export async function deleteUser(id: number) {
//   const accessToken = cookies().get('accessToken');
//   await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
//     method: 'DELETE',
//     headers: accessToken ? {
//       'AccessToken': `${accessToken.value}`
//     } : {}
//   });
// }