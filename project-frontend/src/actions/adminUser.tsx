'use server'

import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type AdminUser = {
  company_id?: number;
  code: string;
  first_name: string;
  last_name: string;
  current_password?: string;
  password?: string;
  email: string;
  status: string;
};

type AdminUserParams = {
  company_name: string;
  code: string;
  first_name: string;
  last_name: string;
  status: string;
};

export async function updateAdminUser(is_new: boolean, data: AdminUser, id?: number) {
  const accessToken = cookies().get('accessToken');
  const url = is_new ? `${process.env.API_BASE_URL}/admin_users` : `${process.env.API_BASE_URL}/admin_users/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: accessToken ? {
        'AccessToken': `${accessToken.value}`,
        'Content-Type': 'application/json'
      } : {},
      body: JSON.stringify({admin_user: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function searchAdminUser(data: AdminUserParams) {
  const accessToken = cookies().get('accessToken');
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`${process.env.API_BASE_URL}/admin_users?${params}`, {
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

export async function deleteAdminUser(id: number) {
  const accessToken = cookies().get('accessToken');
  await fetch(`${process.env.API_BASE_URL}/admin_users/${id}`, {
    method: 'DELETE',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  });
}

export async function fetchCurrentUser() {
  const accessToken = cookies().get('accessToken');
  const res = await fetch(`${process.env.API_BASE_URL}/admin_users/fetch_current_user`, {
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  });
  const response = await res.json();
  return { response };
}
