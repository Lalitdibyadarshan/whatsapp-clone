import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

export function useContacts() {
    return useContext(ContactsContext);
}

const ContactsContext = React.createContext();
export function ContactContextProvider({ children }) {
    const [contacts, setContacts] = useLocalStorage('contacts', []);
    console.log('con-rerender')
    const createContacts = (id, name) => {
        setContacts(prevcontacts => [...prevcontacts, {id, name}]);
    }

    return (
        <ContactsContext.Provider value={{contacts, createContacts}}>
            {children}
        </ContactsContext.Provider>
    );
}
