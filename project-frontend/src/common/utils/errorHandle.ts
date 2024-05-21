export const errorHandle = (error: any) => {
  let errorText = JSON.stringify(error.response.data).replace(/^"(.*)"$/, '$1');

  switch (errorText) {
  // case 'code has already been taken':
  //   errorText = "入力したコードはすでに使用されています。";
  //   break;
  default:
    if (errorText.includes('Code has already been taken')) {
      errorText = "入力したコードはすでに使用されています。";
    } else {
      errorText = "エラーが発生しました。";
    }
    break;
  }
  return errorText;
}