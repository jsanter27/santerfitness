import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Row, Col, Image } from 'react-bootstrap';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';
import SFLoading from './SFLoading';
import SFError from './SFError';

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


const ScheduleScreen = (props) => {

    var { data, loading, error } = useQuery(GET_SCHEDULE);

    if (props.admin){
        data = props.admin.data;
        loading = props.admin.loading;
        error = props.admin.error;
    }

    if (loading)
        return <SFLoading />;
    if (error)
        return <SFError />;

    const getInstructorString = (instructors) => {
        let result = "";
        for (let i = 0; i < instructors.length; i++){
            if (i === instructors.length - 1){
                result += instructors[i];
            }
            else {
                result += instructors[i] + ", ";
            }
        }
        return result;
    }

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
                    <div style={{width:"70%", height:"320px"}}>
                        {data.getSchedule ? 
                            /* <Image
                                className="d-block w-70 sf-schedule-img"
                                key={data.getSchedule.key}
                                src={data.getSchedule.url}
                                alt="Class Schedule"
                            /> */
                            <div key={data.getSchedule.key} className="sf-schedule-img" style={{backgroundImage:`url(${data.getSchedule.url})`, backgroundSize:"cover", maxWidth:"100%", height:"100%"}}/>
                        : 
                            null
                        }
                    </div>
                </Col>
            </Row>
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Class Info</b></h3>    
                </Col>
            </Row>
            {data.getAllEvents.map( (event, index) =>
                <div className="sf-event" key={index}>
                    <Row className="sf-home-row1">
                        <h3 className="sf-home-header" style={{paddingTop:(index===0 ? ".5em" : "0em")}}>
                            <b>{event.name}</b>
                        </h3>
                    </Row>
                    <Row className="sf-home-row1">
                        <h6 className="sf-home-subheader"><b>Instructor(s): {getInstructorString(event.instructors)}</b></h6>
                    </Row>
                    <Row className="sf-home-row1" style={{paddingBottom:"-2em"}}>
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