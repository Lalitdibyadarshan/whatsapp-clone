import React, {useState} from 'react'
import { Button, Modal, Nav, Tab } from 'react-bootstrap'
import Contact from './Contact';
import Conversations from './Conversations';
import NewContacts from './NewContacts';
import NewConversation from './NewConversation';

const CONVERSATIONS = 'Conversations';
const CONTACTS = 'Contacts';
export default function SideBar({ id }) {
    const [activeKey, setActivekey] = useState(CONVERSATIONS);
    const [modalOpen, SetModalOpen] = useState(false);
    const isConversationMode = activeKey === CONVERSATIONS;

    const closeModal = () => {
        SetModalOpen(false);
    }

    return (
        <div style={{width: '250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActivekey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-end overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS}>
                        <Conversations></Conversations>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS}>
                        <Contact/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-end small">
                    Your id: <span className="text-muted">{id}</span>
                </div>
                <Button className="rounded-0" onClick={() => {
                    SetModalOpen(true);
                }}>
                    new { isConversationMode ? 'conversation' : 'contact'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {
                    isConversationMode ?
                    <NewConversation closeModal={closeModal}/> :
                    <NewContacts closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}
