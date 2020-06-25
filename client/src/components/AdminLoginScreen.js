import React, { useState } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import auth from '../services/authService';
import SFModal from './SFModal';

const AdminLoginScreen = () => {

    const [user, setUser] = useState({
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

    const history = useHistory();

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value 
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.login(user).then( (result) => {
            if (result.isAuthenticated){
                history.push('/admin');
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

    return (
        <Container className="sf-login-container">
            <Row className="d-flex justify-content-center">
                <h3><b>Admin Login</b></h3>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={user.username} id="username" name="username" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{width:"100%"}}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={user.password} id="password" name="password" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-center" style={{marginBottom:".5em"}}>
                    <Button variant="dark" type="submit" size="lg">Login</Button>
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