export const errorHandle = (error: any) => {
  const errorArray: string[] = Object.entries(error.response.data).map(
    ([key, value]) => `${key} ${value}`
  );

  let errorText;
  switch (errorArray[0]) {
  case 'code has already been taken':
    errorText = "入力したコードはすでに使用されています。";
    break;
  default:
    errorText = "エラーが発生しました。";
    break;
  }
  return errorText;
}