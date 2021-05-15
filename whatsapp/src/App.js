import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import { ContactContextProvider } from './contexts/ContactContextProvider';
import { ConversationContextProvider } from './contexts/ConversationContextProvider';
import { SocketProvider } from './contexts/SocketProvider';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  console.log('app')
  const [id, setId] = useLocalStorage('id', '');
  const dashboard = (
    <SocketProvider id={id}>
      <ContactContextProvider>
        <ConversationContextProvider id={id}>
          <Dashboard id={id} />
        </ConversationContextProvider>
      </ContactContextProvider>
    </SocketProvider>
  );
  return (
    id ? dashboard :
      <Login onIdSubmit={setId} />
  );
}

export default App;
