import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

export const Login = () => {
  return (
    <div>
      <p>ログインページ</p>
      <Link to="/SignUp" color='red.500'>
        <Text color='red.500'>未登録の方はこちら</Text>
      </Link>
    </div>
  )
}