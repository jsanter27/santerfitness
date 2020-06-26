import React, { useState } from 'react';
import { Container, Row, Form, Button} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import auth from '../services/authService';
import SFModal from './SFModal';

const AdminForgotPasswordScreen = () => {

    const [userInput, setUserInput] = useState({
        username: ""
    });

    const [modal, setModal] = useState({
        show: false,
        message: {
            msgBody: "",
            msgError: false
        }
    });

    const handleChange = (event) => {
        setUserInput({
            username: event.target.value 
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.forgotPassword(userInput).then( (result) => {
            setModal({
                show: true,
                message: result.message
            })
        });
    }

    const handleClose = () => {
        setModal({
            show: false,
            message: {
                msgBody: "",
                msgError: false
            }
        });
    }

    let btnDisabled = true;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(userInput.username))
        btnDisabled = false;

    return (
        <Container className="sf-login-container">
            <Row className="d-flex justify-content-center">
                <h3><b>Password Reset</b></h3>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={userInput.username} id="username" name="username" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-center" style={{marginBottom:".5em"}}>
                    <Button variant="dark" type="submit" size="lg" disabled={btnDisabled}>Send Email</Button>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Link to="/admin/login">Back to Login</Link>
                </Row>
            </Form>
            <SFModal show={modal.show} onHide={handleClose} message={modal.message} />
        </Container>
    );
};

export default AdminForgotPasswordScreen;