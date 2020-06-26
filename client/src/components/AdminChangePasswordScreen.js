import React, { useState } from 'react';
import { Container, Row, Form, Button} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import auth from '../services/authService';
import SFModal from './SFModal';

const AdminChangePasswordScreen = () => {

    const [userInput, setUserInput] = useState({
        password: "",
        confirmPassword: ""
    });

    const [modal, setModal] = useState({
        show: false,
        message: {
            msgBody: "",
            msgError: false
        }
    });

    const { token } = useParams();

    const handleChange = (event) => {
        setUserInput({
            ...userInput,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.changePassword(token, userInput.password).then( (result) => {
            setModal({
                show: true,
                message: result.message
            });
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
    if (userInput.password === userInput.confirmPassword && userInput.confirmPassword.length >= 6 && userInput.password.length >= 6)
        btnDisabled = false;

    return (
        <Container className="sf-login-container">
            <Row className="d-flex justify-content-center">
                <h3><b>Password Reset</b></h3>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control type="password" value={userInput.password} id="password" name="password" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>Confirm New Password:</Form.Label>
                        <Form.Control type="password" value={userInput.confirmPassword} id="confirmPassword" name="confirmPassword" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-center" style={{marginBottom:".5em"}}>
                    <Button variant="dark" type="submit" size="lg" disabled={btnDisabled}>Change Password</Button>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Link to="/admin/login">Back to Login</Link>
                </Row>
            </Form>
            <SFModal show={modal.show} onHide={handleClose} message={modal.message} />
        </Container>
    );
};

export default AdminChangePasswordScreen;