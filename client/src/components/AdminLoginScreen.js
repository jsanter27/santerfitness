import React, { useState, useContext } from 'react';
import { Container, Row, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import SFModal from './SFModal';

const AdminLoginScreen = () => {

    const { setUser, setIsAuthenticated } = useContext(AuthContext);

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
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
            ...userInput,
            [event.target.name]: event.target.value 
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.login(userInput).then( (result) => {
            if (result.isAuthenticated){
                setIsAuthenticated(true);
                setUser(result.user);
            }
            else {
                setModal({
                    show: true,
                    message: result.message
                });
            }
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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(userInput.username) && userInput.password.length >= 6)
        btnDisabled = false;

    return (
        <Container className="sf-login-container">
            <Row className="d-flex justify-content-center">
                <h3><b>Admin Login</b></h3>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={userInput.username} id="username" name="username" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={userInput.password} id="password" name="password" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-center" style={{marginBottom:".5em"}}>
                    <Button variant="dark" type="submit" size="lg" disabled={btnDisabled}>Login</Button>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Link to="/admin/forgot">Forgot Password?</Link>
                </Row>
            </Form>
            <SFModal show={modal.show} onHide={handleClose} message={modal.message} />
        </Container>
    );
};

export default AdminLoginScreen;