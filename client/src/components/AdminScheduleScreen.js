import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { Col, Row, Container, Form, Image, Button } from 'react-bootstrap';
import api from '../services/apiService';

import ScheduleScreen from './ScheduleScreen';
import SFLoading from './SFLoading';
import SFError from './SFError';
import SFModal from './SFModal';

const GET_SCHEDULE = gql`
    query{
        getSchedule{
            _id
            key
            url
            lastModifiedBy
        }
        getAllEvents{
            _id
            name
            description
            instructors
            lastModifiedBy
        }
    }
`;

const AdminScheduleScreen = () => {

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: false
    });

    const [show, setShow] = useState(false);

    const { data, loading, error, refetch } = useQuery(GET_SCHEDULE);

    const history = useHistory();

    if (loading) {
        return <SFLoading/>
    }
    if (error){
        return <SFError/>
    }

    const getInstructorString = (instructors) => {
        let result = "";
        for (let i = 0; i < instructors.length; i++){
            if (i === instructors.length - 1){
                result += instructors[i];
            }
            else {
                result += instructors[i] + ",";
            }
        }
        return result;
    }

    const getInstructorList = (instructors) => {
        return instructors.split(',').map((inst) => inst.trim());
    };

    const handleClose = () => {
        setShow(false);
        setMessage({
            msgBody: "",
            msgError: false
        });
    }

    const handleReplaceSchedule = (event) => {
        event.preventDefault();
        if (!event.target[0].files[0]){
            return;
        }
        let file = event.target[0].files[0];
        if (!file) {
            return;
        }
        else {
            let formData = new FormData();
            formData.append('image', file);
            api.addSchedule(formData).then( (result) => {
                setMessage(result.message);
                setShow(true);
                refetch();
            });
        }
    }

    const handleUpdateEvent = (event, id) => {
        event.preventDefault();

        if (event.target.name.value.trim() === '' || event.target.description.value.trim() === '' || event.target.instructors.value.trim() === '') {
            return;
        }

        let data = {
            name: event.target.name.value,
            description: event.target.description.value,
            instructors: getInstructorList(event.target.instructors.value)
        };

        api.updateEvent(id, data).then( (result) => {
            setMessage(result.message);
            setShow(true);
            refetch();
        });
    }

    const handleDeleteEvent = (id) => {
        api.removeEvent(id).then( (result) => {
            setMessage(result.message);
            setShow(true);
            refetch();
        });
    }

    const handleAddEvent = (event) => {
        event.preventDefault();

        if (event.target.name.value.trim() === '' || event.target.description.value.trim() === '' || event.target.instructors.value.trim() === '') {
            return;
        }

        let data = {
            name: event.target.name.value,
            description: event.target.description.value,
            instructors: getInstructorList(event.target.instructors.value)
        };

        api.addEvent(data).then( (result) => {
            setMessage(result.message);
            setShow(true);
            refetch();
        });
    }

    const goToEditHome = () => {
        history.push('/admin');
    }

    return (
        <Row style={{margin:"1em"}}>
            <Col className="sf-admin-workspace">
                <Container className="sf-admin-container">
                    <Row className="d-flex justify-content-end">
                        <Button variant="info" size="sm" className="sf-admin-button" style={{marginTop:"1em", marginBottom:"-1em"}} onClick={goToEditHome}>Edit Home Page</Button>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <h4 style={{marginBottom:"1em", marginTop:"1em"}}><b>Manage Schedule</b></h4>
                    </Row>
                    {data.getSchedule ?
                        <div key="schedule.jpg">
                            <Row className="d-flex justify-content-center">
                                <h6>Uploaded by: {data.getSchedule.lastModifiedBy}</h6>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Image 
                                    key={data.getSchedule.key}
                                    src={data.getSchedule.url}
                                    alt={data.getSchedule.key}
                                    className="sf-admin-slide"
                                    thumbnail
                                />
                            </Row>
                        </div>
                    :
                        <div key="schedule.jpg">
                            <Row className="d-flex justify-content-center">
                                <h6>No schedule found</h6>
                            </Row>
                        </div>
                    }
                    <Form onSubmit={handleReplaceSchedule}>
                        <Row className="d-flex justify-content-center">
                            <Form.Group style={{textAlign:"center", marginTop:".75em"}}>
                                <Form.File id="replaceSchedule" name="replaceSchedule"/>
                            </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Button type="submit" variant="success" className="sf-admin-button" size="lg" block>Replace Schedule</Button>
                        </Row>
                    </Form>
                    <Row className="d-flex justify-content-center">
                        <h4 style={{marginBottom:"1em"}}><b>Manage Classes</b></h4>
                    </Row>
                    {data.getAllEvents.map( (event, idx) => 
                        <Form key={idx} onSubmit={(event) => handleUpdateEvent(event, event._id)}>
                            <Row className="d-flex justify-content-center">
                                <h6>Last Modified By: {event.lastModifiedBy}</h6>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Form.Group className="sf-admin-textarea">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control as="textarea" rows="1" defaultValue={event.name} id="name" name="name"/>
                                </Form.Group>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Form.Group className="sf-admin-textarea">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3" defaultValue={event.description} id="description" name="description"/>
                                </Form.Group>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Form.Group className="sf-admin-textarea">
                                    <Form.Label>Instructor(s) separated by COMMAS</Form.Label>
                                    <Form.Control as="textarea" rows="1" defaultValue={getInstructorString(event.instructors)} id="instructors" name="instructors"/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="submit" variant="warning" className="sf-admin-button2" size="lg" block>Update Class</Button>
                                </Col>
                                <Col>
                                    <Button type="button" variant="danger" className="sf-admin-button2" size="lg" block onClick={() => handleDeleteEvent(event._id)}>Delete Class</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    <Row className="d-flex justify-content-center">
                        <h4 style={{marginBottom:"1em"}}><b>Add Class</b></h4>
                    </Row>
                    <Form onSubmit={handleAddEvent}>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="sf-admin-textarea">
                                <Form.Label>Name</Form.Label>
                                <Form.Control as="textarea" rows="1" defaultValue="" id="name" name="name"/>
                            </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="sf-admin-textarea">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" defaultValue="" id="description" name="description"/>
                            </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Form.Group className="sf-admin-textarea">
                                <Form.Label>Instructor(s) separated by COMMAS</Form.Label>
                                <Form.Control as="textarea" rows="1" defaultValue="" id="instructors" name="instructors"/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button type="submit" variant="success" className="sf-admin-button" size="lg" block>Add Class</Button>
                        </Row>
                    </Form>
                    <SFModal show={show} onHide={handleClose} message={message}/>
                </Container>
            </Col>
            <Col className="d-none d-lg-block">
                <ScheduleScreen admin={{ data, loading, error }}/>
            </Col>
        </Row>
    );
}

export default AdminScheduleScreen;