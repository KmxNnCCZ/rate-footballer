import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Center,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { signUp } from "../lib/api/auth.js";
import Cookies from "js-cookie";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await signUp({ name, email, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box 
      w="80%"
      mx="auto"
      mt="20%"
    >
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="24px">
        ユーザー新規登録
      </Text>
      <Input
        placeholder="ユーザー名"
        mb="16px"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        placeholder="メールアドレス"
        mb="16px"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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
        <Button alignContent="center" w="400px" bgColor="#89DA59"  mb="8px" onClick={register}>
          登録する
        </Button>
      </Center>
      <Box textAlign="right" color="blue.500">
        <Link to="/login">ログインはこちら</Link>
      </Box>
    </Box>

  );
};