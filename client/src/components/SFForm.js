import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import api from '../services/apiService';
import SFModal from './SFModal';

const SFForm = () => {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const [show, setShow] = useState(false);

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: false
    });

    const handleClose = () => {
        setShow(false);
        setMessage({
            msgBody: "",
            msgError: false
        });
    }

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        api.requestTrial({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone
        }).then( (result) => {
            setMessage(result.message);
            setShow(true);
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            });
        });
    }

    const phoneregex = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
    const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isDisabled = false;
    if (form.firstName.trim() === "" || form.lastName.trim() === "" || form.email.trim() === "" || form.phone.trim() === "" || !phoneregex.test(form.phone) || !emailregex.test(form.email))
        isDisabled= true;

    return (
        <Row className="sf-home-row1 d-flex justify-content-center">
            <Form className="sf-home-form" onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control name="firstName" type="text" value={form.firstName} placeholder="Ex. John" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control name="lastName" type="text" value={form.lastName} placeholder="Ex. Smith" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control name="email" type="email" value={form.email} placeholder="Ex: info@santerfitness.com" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control name="phone" type="text" value={form.phone} placeholder="Ex: 8454969188" onChange={handleChange}/>
                </Form.Group>
                <div className="sf-home-form-button">
                    <Button type="submit" variant="dark" size="lg" block disabled={isDisabled}>
                        Submit
                    </Button>
                </div>
                <Form.Text className="sf-home-form-footer">
                    After submitting, check in at the front desk by giving your name and showing an ID.<br/>
                    <b>All fields required.</b>
                </Form.Text>
            </Form>
            <SFModal show={show} onHide={handleClose} message={message}/>
        </Row>
    );
}

export default SFForm;