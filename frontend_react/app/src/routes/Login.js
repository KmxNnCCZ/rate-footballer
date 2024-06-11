import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { 
  Text,
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { signIn, getUser } from '../lib/api/auth.js'
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const login = async () => {
    try {
      const res = await signIn({ email, password });
      // レスポンスをもとにクッキーをセット
      Cookies.set("_access_token", res.headers["accessToken"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      window.location.reload();
      navigate("/")
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
	      if (res && res.data.isLogin) {
          navigate("/");
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
      <InputGroup>
        <Input
          placeholder="パスワード"
          mb="16px"
          value={password}
          type={isRevealPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
        />
        <InputRightAddon>
          <Button onClick={togglePassword}>
            {isRevealPassword  ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Center>
        <Button alignContent="center" w="400px" bgColor="#89DA59" mb="8px" onClick={login}>
          ログイン
        </Button>
      </Center>
      <Box textAlign="right" color="blue.500">
        <Link to="/signUp">新規登録はこちら</Link>
      </Box>
    </Box>
  )
}