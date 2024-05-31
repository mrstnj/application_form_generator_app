'use server'
 
import { errorHandle } from "@/common/utils/errorHandle";

type Company = {
  code: string;
  name: string;
  status: string;
};

export async function updateCompany(is_new: boolean, data: Company, id?: number) {
  const url = is_new ? 'http://backend:8080/companies' : `http://backend:8080/companies/${id}`;
  const method = is_new ? 'POST' : 'PUT';
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
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
  try {
    const params = new URLSearchParams(data);
    const res = await fetch(`http://backend:8080/companies?${params}`);
    const response = await res.json();
    if (!res.ok) throw new Error(response.err);
    return { result: true, response };
  } catch (error: any) {
    const errorText = errorHandle(error.message)
    return { result: false, errorText };
  }
}

export async function deleteCompany(id: number) {
  await fetch(`http://backend:8080/companies/${id}`, {method: 'DELETE'});
}