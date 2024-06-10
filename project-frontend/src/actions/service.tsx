'use server'
 
import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type Service = {
  name: string;
  content: string;
  img?: string | Blob;
  status: string;
};

type ServiceParams = {
  name: string;
  status: string;
}

const accessToken = cookies().get('accessToken');

export async function updateService(is_new: boolean, data: Service, id?: number) {
  const url = is_new ? `${process.env.API_BASE_URL}/services` : `${process.env.API_BASE_URL}/services/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: accessToken ? {
        'AccessToken': `${accessToken.value}`,
        'Content-Type': 'application/json'
      } : {},
      body: JSON.stringify({service: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function searchService(data: ServiceParams) {
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`${process.env.API_BASE_URL}/services?${params}`, {
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

export async function deleteService(id: number) {
  await fetch(`${process.env.API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  });
}