import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactContextProvider';
import { useConversation } from '../contexts/ConversationContextProvider';

export default function NewConversation({closeModal}) {
    const { contacts } = useContacts();
    const { updateConversations } = useConversation()
    const [selectedContactsId, setSelectedContactsId] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateConversations(selectedContactsId.sort((a,b) => a-b))
        closeModal()
    }

    const handleCheckboxChange = (currentId) => {
        setSelectedContactsId((prevSelections) => {
            if (prevSelections.includes(currentId)) {
                return prevSelections.filter(prevSelection => prevSelection !== currentId)
            } else {
                return [...prevSelections, currentId]
            }
        });
    }

    return (
        <>
            <Modal.Header closeButton>Create conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map((contact) => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactsId.includes(selectedContact => selectedContact.id === contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" className="mt-2">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
