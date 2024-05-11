import { Validate } from "react-hook-form";

const ErrorMessages = {
  required: '必須項目です。',
  code: '半角英数字10文字以内で入力してください。',
}

const Regex = {
  blank: /\S/,
  code: /^[0-9a-zA-Z]{1,10}$/,
}

export const required: Validate<any, any> = (value) => (value && Regex.blank.test(value) || value === 0 ? undefined : ErrorMessages.required);

export const code: Validate<any, any> = (value) => (value && !Regex.code.test(value) ? ErrorMessages.code : undefined);