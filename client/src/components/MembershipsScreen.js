import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Carousel, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';

const MembershipsScreen = () => {

    return (
        <Container fluid="lg">
            <SFNavbar />
            <SFFooter />
        </Container>
    );
}

export default MembershipsScreen;