import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';
import SFCard from './SFCard';
import SFForm from './SFForm';

const MembershipsScreen = () => {

    return (
        <div>
            <SFNavbar />
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Memberships</b></h3>    
                </Col>
            </Row>
            <Row className="sf-home-row1">
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Standard"
                        items={[
                            "Free Group Exercise",
                            "Free Private Fitness Orientation",
                            "Free Childcare",
                            "Nutritional Counselling"
                        ]}
                        style={{marginBottom:"0em"}}
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Student"
                        items={[
                            "Free Group Exercise",
                            "Free Weights",
                            "Seasonal Specials",
                            "Guest Passes",
                        ]}
                        style={{marginBottom:"0em"}}
                    />
                </Col>
            </Row>
            <Row className="sf-home-row1">
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Family (2 members)"
                        items={[
                            "Free Group Exercise",
                            "Free Private Fitness Orientation",
                            "Free Childcare",
                            "Fit Kid Programs Offered"
                        ]} 
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Family (4 members)"
                        items={[
                            "Free Group Exercise",
                            "Free Private Fitness Orientation",
                            "Free Childcare",
                            "Fit Kid Programs Offered"
                        ]} 
                    />
                </Col>
            </Row>
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Free 7 Day Trial</b></h3>    
                </Col>
            </Row>
            <SFForm />
            <SFFooter />
        </div>
    );
}

export default MembershipsScreen;