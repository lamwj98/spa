import React, { useState } from "react";
import { Button, Form, Card, Row, Col, Container, Alert } from "react-bootstrap"
import malePng from "../img/male.png"
import femalePng from "../img/female.png"

export default function ContactCard(props) {
    const [isEditing, setIsEditing] = useState(false)
    const { contact, handleDelete, handleUpdate } = props

    const [name, setName] = useState(contact.name)
    const [email, setEmail] = useState(contact.email)
    const [gender, setGender] = useState(contact.gender)
    const [phone, setPhone] = useState(contact.phone)

    const [showAlert, setShowAlert] = useState(false)

    return (
        <>
        {isEditing ?
                <Col>
                    <Card style={{width:'18rem'}}>
                        <Form>
                            <Row>
                                <Card.Title>
                                    <Form.Group className="m-3">
                                        <Form.Control size="sm" type="text" value={name} onChange={(event) => {setName(event.target.value)}} />
                                    </Form.Group>
                                </Card.Title>
                            </Row>
                            <Card.Body>
                                <Row className="mb-1">
                                    <Col sm={4}>
                                        <Card.Text>
                                            Gender:
                                        </Card.Text>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Group>
                                            <Form.Select size="sm" value={gender} onChange={(event) => {setGender(event.target.value)}}>
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col sm={4}>
                                        <Card.Text>
                                            Email:
                                        </Card.Text>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Group>
                                            <Form.Control size="sm" type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col sm={4}>
                                        <Card.Text>
                                            Contact:
                                        </Card.Text>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Group>
                                            <Form.Control size="sm" type="text" value={phone} onChange={(event) => {setPhone(event.target.value)}} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Button type='button' onClick={() => {
                                setIsEditing(false);
                                setName(contact.name)
                                setEmail(contact.email)
                                setGender(contact.gender)
                                setPhone(contact.phone)
                                }}
                                variant="secondary"
                                className="m-3">
                                Cancel
                            </Button>
                            <Button type='button' onClick={() => {
                                if (gender !== "" && name !== "" && email !== "" && phone !== "") {
                                    handleUpdate(contact._id, name, gender, email, phone);
                                    setIsEditing(false);
                                } else {
                                    setShowAlert(true)
                                }
                            }}
                            variant="secondary"
                            className="m-3">
                                Update
                            </Button>
                        </Form>
                    </Card>
                    {showAlert &&
                        <Alert variant="danger" className="mt-3">
                            <Container>
                                Please provide all the required details!
                            </Container>
                        </Alert>
                    }
                </Col>
                : <Col>
                    <Card style={{width:'18rem'}}>
                        <Row>
                            <Container>
                                {contact.gender === "Male" && <Card.Img src={malePng} variant="top" className="m-3" style={{width: 140, height: 140}} />}
                                {contact.gender === "Female" && <Card.Img src={femalePng} variant="top" className="m-3" style={{width: 140, height: 140}} /> }
                            </Container>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="button" variant="secondary" className="m-3" onClick={() => setIsEditing(true)}>
                                        Edit
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Title className="m-3 mt-4"><em>{contact.name}</em></Card.Title>
                            </Col>
                        </Row>
                        <Card.Body>
                            <Card.Text>
                                Gender: {contact.gender}
                            </Card.Text>
                            <Card.Text>
                                Email: {contact.email}
                            </Card.Text>
                            <Card.Text>
                                Contact No.: {contact.phone}
                            </Card.Text>
                        </Card.Body>
                        <Button type='button' variant="danger" className="m-4" onClick={() => handleDelete(contact._id)}>
                            Delete
                        </Button>
                    </Card>
                </Col>
            }
        </>

    )
}