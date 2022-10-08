import {Container, Row} from 'react-bootstrap';
import React from "react"
import ContactCard from './ContactCard';

export default function ContactList(props) {

    return (
        <>
            <Container className="mt-3">
                <Row md={4} className="g-4">
                    {props.contactList && props.contactList.map((contact) => {
                        return <ContactCard key={contact._id} contact={contact} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
                    })}
                </Row>
            </Container>
        </>
    )

}