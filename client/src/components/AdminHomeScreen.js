import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Col, Row, Container, Form } from 'react-bootstrap';

import HomeScreen from './HomeScreen';

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
        }
    }
`;


const AdminHomeScreen = () => {



    return (
        <Row style={{margin:"2em"}}>
            <Col>
                <Container className="sf-admin-container">
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h4><b>Manage Slides</b></h4>
                        </Col>
                    </Row> 
                </Container>   
            </Col>
            <Col>
                <HomeScreen admin />
            </Col>
        </Row>
    );
};

export default AdminHomeScreen;