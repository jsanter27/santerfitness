import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import api from '../services/apiService';
import SFLoading from './SFLoading';
import SFError from './SFError';
import auth from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const AdminNotifyListScreen = () => {

    const { setUser, setIsAuthenticated } = useContext(AuthContext);

    const [getNumbers, setGetNumbers] = useState({
        data: null,
        message: {
            msgBody: "",
            msgError: false
        }
    });

    const [isLoading, setIsLoading] = useState(true);

    const textArea = useRef(null);

    const history = useHistory();

    useEffect(() => {
        api.getNumbers().then( (result) => {
            console.log(result);
            setGetNumbers(result);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <SFLoading />
    }
    if (getNumbers.message && getNumbers.message.msgError) {
        return <SFError />
    }

    const getNumbersAsString = (numbers) => {
        let str = "";
        numbers.forEach((num) => {
            str += num.number + '\n';
        });
        return str;
    };

    const goToEditHome = () => {
        history.push('/admin/schedule');
    }

    const goToEditClass = () => {
        history.push('/admin');
    }

    const copyToClipboard = (event) => {
        textArea.current.select();
        document.execCommand('copy');
        event.target.focus();
    }

    const logOut = () => {
        auth.logout().then( (result) => {
            setUser(result.user);
            setIsAuthenticated(result.isAuthenticated);
        })
    }

    return(
        <Row style={{margin:"0em", padding:"1em"}}>
            <Col className="sf-admin-workspace">
                <div className="sf-admin-container">
                    <Row className="d-flex justify-content-end" style={{paddingBottom:".5em"}}>
                        <Button variant="danger" size="sm" className="sf-admin-button" style={{marginTop:"1em", marginBottom:"-1em"}} onClick={logOut}>Log Out</Button>
                    </Row>
                    <Row className="d-flex justify-content-end" style={{paddingBottom:".5em"}}>
                        <Button variant="info" size="sm" className="sf-admin-button" style={{marginTop:"1em", marginBottom:"-1em"}} onClick={goToEditHome}>Edit Home Page</Button>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <Button variant="info" size="sm" className="sf-admin-button" style={{marginTop:"1em", marginBottom:"-1em"}} onClick={goToEditClass}>Edit Class Page</Button>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h4 style={{marginTop:"1em", marginBottom:"1em"}}><b>Notification List</b></h4>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center" style={{paddingBottom:"1em"}}>
                        <Button variant="dark" size="lg" style={{width:"30%"}} block onClick={copyToClipboard}>Copy</Button>
                    </Row>
                    <Row style={{paddingBottom:"10em"}} className="d-flex justify-content-center">
                        <Form.Control style={{width:"60%"}} as='textarea' rows={10} ref={textArea} value={getNumbersAsString(getNumbers.data)} readOnly />
                    </Row>
                </div>   
            </Col>
        </Row>
    );
}

export default AdminNotifyListScreen;