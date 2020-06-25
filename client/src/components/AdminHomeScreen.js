import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Col, Row, Container, Form, Image, Button } from 'react-bootstrap';
import api from '../services/apiService';

import HomeScreen from './HomeScreen';
import SFLoading from './SFLoading';
import SFError from './SFError';
import SFModal from './SFModal';

const GET_SLIDES = gql`
    query{
        getAllSlides{
            _id
            key
            url
            lastModifiedBy
        }
    }
`;

const GET_ALERTS = gql`
    query{
        getAllAlerts{
            _id
            message
            isActive
            isEmergency
            lastModifiedBy
        }
    }
`;


const AdminHomeScreen = () => {

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: false
    });

    const [show, setShow] = useState(false);

    const useAdminHomeQueries = () => {
        const slides = useQuery(GET_SLIDES);
        const alerts = useQuery(GET_ALERTS);
        return [slides, alerts];
    };

    const [slides, alerts] = useAdminHomeQueries();

    if (slides.loading || alerts.loading) {
        return <SFLoading />
    }
    if (slides.error || alerts.error) {
        return <SFError />
    }

    let data = {
        slides: slides.data.getAllSlides,
        alerts: alerts.data.getAllAlerts
    };

    const handleClose = () => {
        setShow(false);
        setMessage({
            msgBody: "",
            msgError: false
        });
    }

    const handleDeleteSlide = (key) => {
        api.removeSlide(key).then( (result) => {
            setMessage(result.message);
            setShow(true);
        });
    }

    const handleAddSlide = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        if (!file) {
            return;
        }
        else {
            let formData = new FormData();
            formData.append('image', file);
            api.addSlide(formData).then( (result) => {
                setMessage(result.message);
                setShow(true);
            });
        }
    }

    const handleUpdateAlert = (event, id) => {
        event.preventDefault();

        if (event.target.message.value.trim() === '')
            return;

        let data = {
            message: event.target.message.value,
            isActive: event.target.isActive.checked,
            isEmergency: event.target.isEmergency.checked,
        };

        api.updateAlert(id, data).then( (result) => {
            setMessage(result.message);
            setShow(true);
        });
    }

    const handleDeleteAlert = (id) => {
        api.removeAlert(id).then( (result) => {
            setMessage(result.message);
            setShow(true);
        });
    }

    const handleAddAlert = (event) => {
        event.preventDefault();

        if (event.target.message.value.trim() === '')
            return;

        let data = {
            message: event.target.message.value,
            isActive: event.target.isActive.checked,
            isEmergency: event.target.isEmergency.checked
        };

        api.addAlert(data).then( (result) => {
            setMessage(result.message);
            setShow(true);
        });
    }

    return (
        <Row style={{margin:"1em"}}>
            <Col className="sf-admin-workspace">
                <Container className="sf-admin-container">
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h4 style={{marginTop:"2em"}}><b>Manage Slides</b></h4>
                        </Col>
                    </Row>
                    {data.slides.map( (slide, idx) => 
                        <div key={idx}>
                            <Row className="d-flex justify-content-center">
                                <Image
                                    key={slide.key}
                                    src={slide.url}
                                    alt={slide.key}
                                    className="sf-admin-slide"
                                    thumbnail
                                />
                            </Row>
                            <Row>
                                <Button variant="danger" className="sf-admin-button" size="lg" block onClick={() => handleDeleteSlide(slide.key)}>Delete Slide</Button>
                            </Row>
                        </div>
                    )}
                    <Row className="d-flex justify-content-center">
                        <h4><b>Add Slide</b></h4>
                    </Row>
                    <Form onSubmit={handleAddSlide}>
                        <Row className="d-flex justify-content-center">
                            <Form.Group style={{textAlign:"center"}}>
                                <Form.File id="addSlide" name="addSlide"/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button type="submit" variant="success" className="sf-admin-button" size="lg" block>Add Slide</Button>
                        </Row>
                    </Form>
                    <Row className="d-flex justify-content-center">
                        <h4><b>Manage Alerts</b></h4>
                    </Row>
                    {data.alerts.map( (alert, idx) => 
                        <Form key={idx} onSubmit={(event) => handleUpdateAlert(event, alert._id)}>
                            <Row className="d-flex justify-content-center">
                                <Form.Group className="sf-admin-textarea">
                                    <Form.Label>Message (last edited by {alert.lastModifiedBy})</Form.Label>
                                    <Form.Control as="textarea" rows="3" defaultValue={alert.message} id="message" name="message"/>
                                </Form.Group>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Form.Group>
                                    <Form.Check label="Active?" type="checkbox" defaultChecked={alert.isActive} name="isActive" id="isActive" inline />
                                    <Form.Check label="Urgent? (Red)" type="checkbox" defaultChecked={alert.isEmergency} name="isEmergency" id="isEmergency" inline />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="submit" variant="warning" className="sf-admin-button2" size="lg" block>Update Alert</Button>
                                </Col>
                                <Col>
                                    <Button type="button" variant="danger" className="sf-admin-button2" size="lg" block onClick={() => handleDeleteAlert(alert._id)}>Delete Alert</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    <Row className="d-flex justify-content-center">
                        <h4><b>Add Alert</b></h4>
                    </Row>
                    <Form onSubmit={handleAddAlert}>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="sf-admin-textarea">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows="3" defaultValue="" id="message" name="message"/>
                            </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group>
                                <Form.Check label="Active?" type="checkbox" defaultChecked={true} name="isActive" id="isActive" inline />
                                <Form.Check label="Urgent? (Red)" type="checkbox" defaultChecked={false} name="isEmergency" id="isEmergency" inline />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button type="submit" variant="success" className="sf-admin-button" size="lg" block>Add Alert</Button>
                        </Row>
                    </Form>
                    <SFModal show={show} onHide={handleClose} message={message}/>
                </Container>   
            </Col>
            <Col className="d-none d-lg-block">
                <HomeScreen admin/>
            </Col>
        </Row>
    );
};

export default AdminHomeScreen;