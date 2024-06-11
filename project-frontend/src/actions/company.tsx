'use server'
 
import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type Company = {
  code: string;
  name: string;
  status: string;
};

export async function updateCompany(is_new: boolean, data: Company, id?: number) {
  const accessToken = cookies().get('accessToken');
  const url = is_new ? `${process.env.API_BASE_URL}/companies` : `${process.env.API_BASE_URL}/companies/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: accessToken ? {
        'AccessToken': `${accessToken.value}`,
        'Content-Type': 'application/json'
      } : {},
      body: JSON.stringify({company: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function searchCompany(data: Company) {
  const accessToken = cookies().get('accessToken');
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`${process.env.API_BASE_URL}/companies?${params}`, {
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

export async function deleteCompany(id: number) {
  const accessToken = cookies().get('accessToken');
  await fetch(`${process.env.API_BASE_URL}/companies/${id}`, {
    method: 'DELETE',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  });
}