import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { useHistory } from 'react-router-dom';
import { Col, Row, Container, Form, Image, Button } from 'react-bootstrap';
import api from '../services/apiService';

import HomeScreen from './HomeScreen';
import SFLoading from './SFLoading';
import SFError from './SFError';
import SFModal from './SFModal';

const GET_HOME = gql`
    query{
        getAllSlides{
            _id
            key
            url
            lastModifiedBy
        }
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

    const { data, loading, error, refetch } = useQuery(GET_HOME);

    const history = useHistory();

    if (loading) {
        return <SFLoading />
    }
    if (error) {
        return <SFError />
    }

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
            refetch();
        });
    }

    const handleAddSlide = (event) => {
        event.preventDefault();
        if(!event.target[0].files[0]){
            return;
        }
        let file = event.target[0].files[0];
        if (!file) {
            return;
        }
        else {
            let formData = new FormData();
            formData.append('image', file);
            api.addSlide(formData).then( (result) => {
                setMessage(result.message);
                setShow(true);
                refetch();
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
            refetch();
        });
    }

    const handleDeleteAlert = (id) => {
        api.removeAlert(id).then( (result) => {
            setMessage(result.message);
            setShow(true);
            refetch();
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
            refetch();
        });
    }

    const goToEditClass = () => {
        history.push("/admin/schedule");
    }

    return (
        <Row style={{margin:"0em"}}>
            <Col className="sf-admin-workspace">
                <div className="sf-admin-container">
                    <Row className="d-flex justify-content-end">
                        <Button variant="info" size="sm" className="sf-admin-button" style={{marginTop:"1em", marginBottom:"-1em"}} onClick={goToEditClass}>Edit Class Page</Button>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h4 style={{marginTop:"1em", marginBottom:"1em"}}><b>Manage Slides</b></h4>
                        </Col>
                    </Row>
                    {data.getAllSlides.map( (slide, idx) => 
                        <div key={idx}>
                            <Row className="d-flex justify-content-center">
                                <h6>Uploaded by: {slide.lastModifiedBy}</h6>
                            </Row>
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
                    {data.getAllAlerts.map( (alert, idx) => 
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
                                <Col className="d-flex justify-content-center">
                                    <Button type="submit" variant="warning" className="sf-admin-button2" size="lg">Update Alert</Button>
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <Button type="button" variant="danger" className="sf-admin-button2" size="lg" onClick={() => handleDeleteAlert(alert._id)}>Delete Alert</Button>
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
                </div>   
            </Col>
            <Col className="d-none d-lg-block">
                <HomeScreen admin={{ data, loading, error }}/>
            </Col>
        </Row>
    );
};

export default AdminHomeScreen;