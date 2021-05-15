import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactContextProvider';
import isEqual from 'lodash/isEqual';
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();
export function useConversation() {
    return useContext(ConversationContext);
}

export function ConversationContextProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket();

    const updateConversations = (recipients) => {
        setConversations(prevConversations => {
            if (isExistingRecipientGroup(recipients)) return prevConversations;
            return [...prevConversations, {recipients, messages: [] }]
        })
    };

    const isExistingRecipientGroup = (recipients) => {
        return conversations.find(conversation => isEqual(conversation.recipients, recipients));
    }
    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => contact.id === recipient);
            const name = (contact && contact.name) || recipient;
            return {id: recipient, name};
        });
        const selected = index === selectedConversationIndex;
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            });
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe};
        })
        return {...conversation, recipients, selected, messages}
    })

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text })
        addMessageToConversation({recipients, text, sender: id})
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        console.log('fefe,', recipients)
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = {sender, text};
            const newConversation = prevConversations.map(conversation => {
                if (isEqual(conversation.recipients, recipients)) {
                    madeChange = true;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation;
            })
            if (madeChange) {
                return newConversation;
            } else {
                return [
                    ...prevConversations,
                    {recipients, messages: [newMessage]}
                ]
            }
        });
    }, [setConversations])

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage: sendMessage,
        updateConversations,
        setSelectedConversationIndex
    }

    
    useEffect(() => {
        if (socket == null) return;
        socket.on('recieve-message', addMessageToConversation)
        return () => socket.off('recieve-message')
    }, [socket, addMessageToConversation])

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}
