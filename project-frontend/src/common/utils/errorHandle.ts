export const errorHandle = (error: any): string => {
  // let errorText = JSON.stringify(error.response.data).replace(/^"(.*)"$/, '$1');
  let errorText = JSON.stringify(error).replace(/^"(.*)"$/, '$1');

  switch (errorText) {
  case 'Access Denied. token is expired':
  case 'Access Denied. Please set token':
    errorText = "認証エラーです。ログインし直してください。";
    break;
  case 'Invalid code or password':
    errorText = "ログインIDもしくはパスワードが間違っています。";
    break;
  case 'Company not found':
    errorText = "企業IDが間違っています。";
    break;
  case 'User is locked':
    errorText = "連続して不正なパスワードが入力されたため、アカウントをロックしました。";
    break;
  case 'Invalid password':
    errorText = "パスワードが間違っています。"
    break;
  default:
    if (errorText.includes('Code has already been taken')) {
      errorText = "入力したコードはすでに使用されています。";
    } else if (errorText.includes('Form items name has already been taken')) {
      errorText = "同じフォーム項目名は2つ以上登録できません。";
    } else {
      errorText = "エラーが発生しました。";
    }
    break;
  }
  return errorText;
}