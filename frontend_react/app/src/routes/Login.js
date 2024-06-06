import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Text,
  Box,
  Input,
  Button,
  Center
} from '@chakra-ui/react';

import { signIn, getUser } from '../lib/api/auth.js'
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await signIn({ email, password });
      // レスポンスをもとにクッキーをセット
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/Top")

    } catch (e) {
      console.log(e);
    }
  }

  // すでにログイン済みであればトップページに遷移
  // useEffect内でf関数を定義し実行しているのは、第1引数の関数の戻り値にはクリーンアップ関数を設定する必要がある非同期関数をそのまま書くとエラーが起きてしまうから
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
	      if (res.data.isLogin) {
          navigate("/Top");
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  return (
    <Box 
      w="80%"
      mx="auto"
      mt="20%"
    >
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="24px">
        ログインページ
      </Text>
      <Input
        placeholder="メールアドレス" 
        mb="16px" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input 
        placeholder="パスワード" 
        mb="16px" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Center>
        <Button alignContent="center" w="400px" backgroundColor="#89DA59" mb="8px" onClick={login}>
          ログイン
        </Button>
      </Center>
      <Box textAlign="right">
        <Link to="/signUp">ユーザー登録はこちら</Link>
      </Box>
    </Box>
  )
}