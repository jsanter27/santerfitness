import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { AiFillPhone } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { FaBuilding } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

const SFFooter = () => {

    return(
        <IconContext.Provider value={{className:"contact-icons"}}>
            <Col className="sf-footer" id="sf-footer">
                <Row className="sf-footer-top">
                    <Col>
                        <Row className="sf-footer-title1">
                            <Col className="d-flex justify-content-start">
                                <h5><b>Hours</b></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-start">
                                <ListGroup className="sf-hours-list">
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Sunday</b><br/>7:00am - 5:00pm
                                    </ListGroup.Item>
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Monday</b><br/>5:00am - 10:00pm
                                    </ListGroup.Item>
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Tueday</b><br/>5:00am - 10:00pm
                                    </ListGroup.Item>
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Wednesday</b><br/>5:00am - 10:00pm
                                    </ListGroup.Item>
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Thursday</b><br/>5:00am - 10:00pm
                                    </ListGroup.Item>
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Friday</b><br/>5:00am - 9:00pm
                                    </ListGroup.Item>
                                    <ListGroup.Item className="sf-hours-list-item">
                                        <b>Saturday</b><br/>7:00am - 7:00pm
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="sf-footer-info">
                        <Row className="sf-footer-title2 d-flex justify-content-start">
                            <h5><b>Contact</b></h5>
                        </Row>
                        <Row className="d-flex justify-content-start">
                            <p className="sf-contact-info">
                                <FaBuilding/><br/>
                                Santer Fitness<br/>
                                3 Locust Street<br/>
                                Washingtonville, NY 10992<br/><br/>
                                <AiFillPhone/><br/>
                                (845) 496-9188<br/><br/>
                                <GrMail /><br/>
                                info.santerfitness@gmail.com<br/>
                            </p>
                        </Row>
                        <Row className="sf-footer-title2 d-flex justify-content-start">
                            <h5><b>Social Media</b></h5>
                        </Row>
                        <Row className="d-flex justify-content-start" style={{marginBottom: "1.5em"}}>
                            <div className="sf-contact-info">
                                <SocialIcon className="sf-social-button" url="https://www.facebook.com/Santer-Fitness-227206090662880/?ref_type=bookmark"/>
                                <SocialIcon className="sf-social-button" url="https://twitter.com/santerfitness" />
                                <SocialIcon className="sf-social-button" url="https://www.instagram.com/santerfitness/" /> 
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row className="sf-footer-bottom d-flex justify-content-center">
                    <p>Copyright © 2020 - Santer Fitness</p>
                </Row>
            </Col>
        </IconContext.Provider>
    );
}

export default SFFooter;