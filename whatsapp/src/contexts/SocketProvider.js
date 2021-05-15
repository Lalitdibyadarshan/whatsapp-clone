import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children}) {
    const [sockect, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            { query: { id } }
        )
        setSocket(newSocket)
        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={sockect}>
            {children}
        </SocketContext.Provider>
    )
}
