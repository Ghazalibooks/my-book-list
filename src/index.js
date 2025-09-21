import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'; // 1. ChakraProvider importieren

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Deine gesamte App mit dem ChakraProvider umwickeln */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
