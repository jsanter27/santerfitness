import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Row, Col, Image, Button } from 'react-bootstrap';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';
import SFLoading from './SFLoading';
import SFError from './SFError';

const GET_SCHEDULE = gql`
    query{
        getSchedule{
            key
            url
        }
    }
`;

const GET_EVENTS = gql`
    query{
        getAllEvents{
            name
            description
            instructors
        }
    }
`;


const ScheduleScreen = (props) => {

    const useScheduleQueries = () => {
        const schedule = useQuery(GET_SCHEDULE);
        const events = useQuery(GET_EVENTS);
        return {schedule, events};
    }


    const {schedule, events} = useScheduleQueries();

    if (schedule.loading || events.loading)
        return <SFLoading />;
    if (schedule.error || events.error)
        return <SFError />;

    let data = {
        schedule: schedule.data.getSchedule,
        events: events.data.getAllEvents
    }

    /* const handleDownload = () => {
        let element = document.createElement("a");
        let file = new Blob([data.schedule.url], { type: "image/*"});
        element.href = URL.createObjectURL(file);
        element.download = "schedule.jpg";
        element.click();
    }; */

    return (
        <div>
            <SFNavbar admin={props.admin} />
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Class Schedule</b></h3>    
                </Col>
            </Row>
            <Row className="sf-home-row1">
                <Col className="d-flex justify-content-center">
                    {data.schedule ? 
                        <Image
                            className="sf-schedule-img"
                            key={data.schedule.key}
                            src={data.schedule.url}
                            alt="Class Schedule"
                        /> 
                    : 
                        <h5 className="sf-member-header">Schedule not found</h5>
                    }
                </Col>
            </Row>
            {/* <Row className="sf-home-row1">
                <Col className="d-flex justify-content-center">
                    <Button className="sf-schedule-button" block size="lg" variant="dark" onClick={handleDownload}>Download Schedule</Button>
                </Col>
            </Row> */}
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Class Info</b></h3>    
                </Col>
            </Row>
            {data.events.map( (event, index) =>
                <div className="sf-event" key={index}>
                    <Row className="sf-home-row1">
                        <h3 className="sf-home-header" style={{paddingTop:".75em"}}>
                            <b>{event.name}</b>
                        </h3>
                    </Row>
                    <Row className="sf-home-row1">
                        {event.instructors.map( (instructor, index) => {
                            if (index !== event.instructors.length - 1) {
                                return (
                                    <h6 key={index} className="sf-home-subheader"><b>{instructor}, </b></h6>
                                );
                            }
                            else if (index === 0 && event.instructors.length === 1){
                                return (
                                    <h6 key={index} className="sf-home-subheader"><b>Instructor: {instructor}</b></h6>
                                )
                            }
                            else if (index === 0 && event.instructors.length > 1){
                                return (
                                    <h6 key={index} className="sf-home-subheader"><b>Instructors: {instructor}, </b></h6>
                                )
                            }
                            else {
                                return (
                                    <h6 key={index} className="sf-home-subheader"><b>{instructor}</b></h6>
                                )
                            }
                        })}
                    </Row>
                    <Row className="sf-home-row1">
                        <p className="sf-home-body">
                            {event.description}
                        </p>
                    </Row>
                </div>
            )}
            <SFFooter />
        </div>
    );
}

export default ScheduleScreen;