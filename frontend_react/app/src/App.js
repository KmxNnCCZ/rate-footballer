import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { Top } from './routes/Top';
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';
import { Notfound } from './routes/Notfound';

function App() {
  return (
   <ChakraProvider>
    <Routes>
      <Route path="/" element={ <Top /> }></Route>
      <Route path="login" element={ <Login /> }></Route>
      <Route path="signUp" element={ <SignUp /> }></Route>
      <Route path="*" element={ <Notfound /> } />
    </Routes>
   </ChakraProvider>
  );
}

export default App;
