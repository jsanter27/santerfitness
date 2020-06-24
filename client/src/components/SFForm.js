import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';

const SFForm = () => {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

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
    }

    let isDisabled = false;
    if (form.firstName.trim() === "" || form.lastName.trim() === "" || form.email.trim() === "" || form.phone.trim() === "")
        isDisabled= true;

    return (
        <Row className="sf-home-row1 d-flex justify-content-center">
            <Form className="sf-home-form" onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="Ex. John" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Ex. Smith" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Ex: info@santerfitness.com" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control name="phone" type="text" placeholder="Ex: (845) 496-9188" onChange={handleChange}/>
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
        </Row>
    );
}

export default SFForm;