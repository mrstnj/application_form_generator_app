import { Validate } from "react-hook-form";

const ErrorMessages = {
  required: '必須項目です。',
  code: '半角英数字20文字以内で入力してください。',
  email: '正しいメールアドレスの形式で入力してください。',
  password: '英数字を組み合わせた8文字以上50文字以内で入力してください。',
}

const Regex = {
  blank: /\S/,
  code: /^[0-9a-zA-Z_]{1,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}$/,
}

export const required: Validate<any, any> = (value) => (value && Regex.blank.test(value) || value === 0 ? undefined : ErrorMessages.required);

export const code: Validate<any, any> = (value) => (value && !Regex.code.test(value) ? ErrorMessages.code : undefined);

export const email: Validate<any, any> = (value) => (value && !Regex.email.test(value) ? ErrorMessages.email : undefined);

export const password: Validate<any, any> = (value) => (value && !Regex.password.test(value) ? ErrorMessages.password : undefined);