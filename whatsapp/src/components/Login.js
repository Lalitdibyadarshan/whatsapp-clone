import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuid} from 'uuid';

export default function Login( {onIdSubmit}) {
    const  idRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onIdSubmit(idRef.current.value);
    }

    const createNewId = () => {
        onIdSubmit(uuid())
    }

    return (
        <Container className="d-flex align-items-center" style={{ height: '100vh'}}>
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label>Enter your Id</Form.Label>
                    <Form.Control type="text" ref={idRef} required>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="me-2">Login</Button>
                <Button variant='secondary' onClick={createNewId}>Create a new ID</Button>
            </Form>
        </Container>
    )
}
