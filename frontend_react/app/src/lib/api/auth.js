import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）

// 新規登録
export const signUp = (params) => {
  return client.post("auth", params);
};

// ログイン
export const signIn = (params) => {
  return client.post("auth/sign_in", params);
};

// ユーザーがログインしている場合はユーザー情報を取得
export const getUser = () => {
  // ログインしていない場合は何も返さず終了
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  ){
    return;
  }else{
    // ログインしている場合はヘッダーにトークンをつける
    return client.get("/auth/sessions", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
};