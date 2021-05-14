import React, {useState} from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import { ContactContextProvider } from './contexts/ContactContextProvider';
import { ConversationContextProvider } from './contexts/ConversationContextProvider';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  console.log('app')
  const [id, setId] = useLocalStorage('id', '');
  const dashboard = (
    <ContactContextProvider>
      <ConversationContextProvider id = {id}>
        <Dashboard id={id}/>
      </ConversationContextProvider>
    </ContactContextProvider>  
  );
  return (
      id ? dashboard :
        <Login onIdSubmit={setId} />
  );
}

export default App;
