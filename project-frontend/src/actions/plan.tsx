'use server'
 
import { cookies } from 'next/headers'
import { errorHandle } from "@/common/utils/errorHandle";

type Plan = {
  service_id: number;
  name: string;
  content: string;
  form_id: number;
  status: string;
};

type PlanParams = {
  service: string;
  name: string;
  status: string;
}

export async function updatePlan(is_new: boolean, data: Plan, id?: number) {
  const accessToken = cookies().get('accessToken');
  const url = is_new ? `${process.env.API_BASE_URL}/plans` : `${process.env.API_BASE_URL}/plans/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: accessToken ? {
        'AccessToken': `${accessToken.value}`,
        'Content-Type': 'application/json'
      } : {},
      body: JSON.stringify({plan: data})
    })
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function searchPlan(data: PlanParams) {
  const accessToken = cookies().get('accessToken');
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`${process.env.API_BASE_URL}/plans?${params}`, {
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

export async function deletePlan(id: number) {
  const accessToken = cookies().get('accessToken');
  await fetch(`${process.env.API_BASE_URL}/plans/${id}`, {
    method: 'DELETE',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  });
}