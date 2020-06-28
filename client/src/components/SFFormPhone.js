import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import api from '../services/apiService';
import SFModal from './SFModal';

const SFFormPhone = () => {

    const [form, setForm] = useState({
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
        setForm({
            phone: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        api.addNumber(form.phone).then( (result) => {
            setMessage(result.message);
            setShow(true);
            setForm({
                phone: ""
            });
        });
    }

    const phoneregex = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
    let isDisabled = false;
    if (form.phone.trim() === "" || !phoneregex.test(form.phone))
        isDisabled= true;

    return (
        <Row className="sf-home-row1 d-flex justify-content-center">
            <Form className="sf-home-form" onSubmit={handleSubmit} style={{width:"55%"}}>
                <Form.Group controlId="phone">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control name="phone" type="text" value={form.phone} placeholder="Ex: 8454969188" onChange={handleChange}/>
                </Form.Group>
                <div className="sf-home-form-button">
                    <Button type="submit" variant="dark" size="lg" block disabled={isDisabled}>
                        Submit
                    </Button>
                </div>
            </Form>
            <SFModal show={show} onHide={handleClose} message={message}/>
        </Row>
    );
}

export default SFFormPhone;