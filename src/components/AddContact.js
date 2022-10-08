import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'

export default function AddContact(props) {
    const { handleAdd } = props

    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [showAlert, setShowAlert] = useState(false)

    const addContact = () => {
        if (name !== "" && email !== "" && phone !== "" && gender !== "") {
            handleAdd(name, gender, email, phone);
            setShowAlert(false)
        } else {
            setShowAlert(true)
        }
    }

    return (
        <Container className="pb-5">
            <Form>
                <Form.Group className="m-3">
                    <Form.Control size="md" type="text" value={name} onChange={(event) => {setName(event.target.value)}} placeholder="Name"/>
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Select size="md" value={gender} onChange={(event) => {setGender(event.target.value)}} >
                        <option value="" disabled defaultValue>
                            Gender
                        </option>
                        <option value="Male">
                            Male
                        </option>
                        <option value="Female">
                            Female
                        </option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Control size= "md" type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} placeholder="Email"/>
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Control size="md" type="text" value={phone} onChange={(event) => {setPhone(event.target.value)}} placeholder="Phone number"/>
                </Form.Group>
                <Button type="button"
                        onClick={() => {addContact()}}
                        variant="secondary">
                    Add New Contact
                </Button>
            </Form>
            {showAlert && <Alert variant="danger" className="mt-3">
                <Container>
                    Please provide all the required details!
                </Container>
            </Alert>
            }
        </Container>
    )
}