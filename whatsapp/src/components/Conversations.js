import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversation } from '../contexts/ConversationContextProvider'

export default function Conversations() {
    const {conversations, setSelectedConversationIndex} = useConversation();
    console.log('a',conversations)
    return (
        <ListGroup variant="flush">
        {
            conversations.map((conversation, index) =>
            <ListGroup.Item
                key={index}
                active={conversation.selected}
                onClick={() => setSelectedConversationIndex(index)}
                >
                {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroup.Item>)
        }
    </ListGroup>
    )
}
