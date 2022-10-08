import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form, Card, Container } from 'react-bootstrap';
import ContactList from './components/ContactList';
import React, { useEffect, useState } from "react";
import axios from "axios"
import AddContact from './components/AddContact';
import ContactBook from './img/contact-book.png'
import { Container, Col, Row } from 'react-bootstrap'

function App() {

  const [contactList, setContactList] = useState("");

  useEffect(() => {
      console.log("Starting")
      axios.get("https://contact-app-b.herokuapp.com/api/contacts").then((res) => {
          setContactList(res.data)
      }).catch((err) => {
          console.log(err)
      })
  }, [])

  const handleDelete = (id) => {
    axios.delete("https://contact-app-b.herokuapp.com/api/contacts/" + id).then((res) => {
      if (res.data.status === 'success') {
        axios.get("https://contact-app-b.herokuapp.com/api/contacts").then((res) => {
          setContactList(res.data)
          console.log("Updating after deleting")
      }).catch(err => console.log(err))
    } else {
      //err
      console.log(res.data.message)
    }}).catch((err) => {
          console.log(err)
    })
  }

  const handleUpdate = (id, name, gender, email, phone) => {
    axios.put("https://contact-app-b.herokuapp.com/api/contacts/" + id, {
        name: name,
        email: email,
        gender: gender,
        phone: phone
      }
    ).then((res) => {
      if (res.data.status === 'success') {
        axios.get("https://contact-app-b.herokuapp.com/api/contacts").then((res) => {
          setContactList(res.data)
          console.log("Updating after update")
        })
      } else {
        //err
        console.log(res.data.message)
      }
    }).catch(
      (err) => console.log(err)
    )
  }

  const handleAdd = (name, gender, email, phone) => {
    axios.post("https://contact-app-b.herokuapp.com/api/contacts/", {
      name: name,
      gender: gender,
      email: email,
      phone: phone
    }).then((res) => {
      if (res.data.status === 'success') {
        axios.get("https://contact-app-b.herokuapp.com/api/contacts").then((res) => {
          setContactList(res.data)
          console.log("Updating after adding")
        }).catch(err => console.log(err))
      } else {
        console.log(res.status.message)
      }
    }).catch(
      (err) => console.log(err)
    )
  }


  return (
    <div className="App">
      <Container className="mt-5">
        <Row>
          <Col md={1}>
            <img src={ContactBook} alt="contact_book_icon" style={{height: 50}}/>
          </Col>
          <Col md={1} />
          <Col md={8}>
            <h2>
              Contacts
            </h2>
          </Col>
          <Col md={2} />
        </Row>
      </Container>
      <AddContact handleAdd={handleAdd} />
      <ContactList contactList={contactList} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;
