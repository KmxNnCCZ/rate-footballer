import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Flex, Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header.js'
import { Footer } from './components/Footer.js'

import { Top } from './routes/Top';
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';
import { Notfound } from './routes/Notfound';

function App() {
  return (
   <ChakraProvider>
    <Flex
      direction="column"
      minHeight="100vh"
    >
      <Header />
      <Box flex="1">
        <Routes>
          <Route path="/" element={ <Top /> }></Route>
          <Route path="login" element={ <Login /> }></Route>
          <Route path="signUp" element={ <SignUp /> }></Route>
          <Route path="*" element={ <Notfound /> } />
        </Routes>
      </Box>
      <Footer />
    </Flex>
   </ChakraProvider>
  );
}

export default App;
