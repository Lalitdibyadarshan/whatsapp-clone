import React from 'react'
import { useConversation } from '../contexts/ConversationContextProvider'
import OpenConversation from './OpenConversation';
import SideBar from './SideBar'

export default function Dashboard({ id }) {
    const {selectedConversation} = useConversation();
    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <SideBar id = {id} ></SideBar>
            {selectedConversation && <OpenConversation/>}
        </div>
    )
}
