'use server'
 
import { errorHandle } from "@/common/utils/errorHandle";

type AdminUser = {
  code: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
};

export async function updateAdminUser(is_new: boolean, data: AdminUser, id?: number) {
  const url = is_new ? 'http://backend:8080/admin_users' : `http://backend:8080/admin_users/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
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

export async function searchAdminUser(data: AdminUser) {
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`http://backend:8080/admin_users?${params}`);
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true, response };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function deleteAdminUser(id: number) {
  await fetch(`http://backend:8080/admin_users/${id}`, {method: 'DELETE'});
}