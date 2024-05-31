'use server'
 
import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type AdminUser = {
  code: string;
  password: string;
};

export async function login(data: AdminUser) {
  try {
    const res = await fetch('http://backend:8080/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({session: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    cookies().set('accessToken', response.access_token)
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText: errorText };
  }
}