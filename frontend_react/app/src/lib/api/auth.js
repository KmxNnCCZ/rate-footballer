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


// ユーザー情報を取得
export const getUser = () => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken|| !clientToken || !uid) {
    return; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  // ヘッダーを設定
  const headers = {
    "access-token": accessToken,
    "client": clientToken,
    "uid": uid,
  };

  // ユーザー情報を取得
  return client.get("/auth/sessions", { headers });
};
