import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Container, Row, Col } from 'react-bootstrap';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';

const ScheduleScreen = () => {

    return (
        <Container fluid="lg">
            <SFNavbar />
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Class Schedule</b></h3>    
                </Col>
            </Row>
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Class Info</b></h3>    
                </Col>
            </Row>
            <SFFooter />
        </Container>
    );
}

export default ScheduleScreen;