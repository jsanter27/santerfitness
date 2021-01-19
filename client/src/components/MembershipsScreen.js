import React from 'react';
import { Row, Col } from 'react-bootstrap';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';
import SFCard from './SFCard';
import SFForm from './SFForm';

const MembershipsScreen = (props) => {

    return (
        <div>
            <SFNavbar admin={props.admin} />
            <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Memberships</b></h3>    
                </Col>
            </Row>
            <Row xs={1} sm={2} className="sf-home-row1">
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Standard"
                        items={[
                            "$39.99/month",
                            "$59 Annual Maintenance",
                            "All Group Fitness Classes",
                            "Special Guest Privileges",
                            "Complete Use of Gym Facilities",
                            "Fitness Consultation with a Certified Personal Trainer",
                            "No Commit, No Hassle Membership",
                            "No Contract Obligation",
                            "Cancel At Any Time with No Fees"
                        ]}
                        style={{marginBottom:"0em"}}
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Student"
                        items={[
                            "$24.99/month (HIGH SCHOOL)",
                            "$29.99/month (COLLEGE)",
                            "$10.00 Sign-Up Fee",
                            "No Commit, No Hassle Membership",
                            "No Contract Obligation",
                            "Cancel At Any Time with No Fees"
                        ]}
                        style={{marginBottom:"0em"}}
                    />
                </Col>
            </Row>
            <Row xs={1} sm={2} className="sf-home-row1">
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Family Plan 1"
                        items={[
                            "2 Family Members",
                            "$72.99/month",
                            "$59 Annual Maintenence",
                            "Free for Family Members Under 16 Accompanied by Adult",
                            "All Group Fitness Classes",
                            "Special Guest Privileges",
                            "Complete Use of Gym Facilities",
                            "Fitness Consultation with a Certified Personal Trainer",
                            "No Commit, No Hassle Membership",
                            "No Contract Obligation",
                            "Cancel At Any Time with No Fees"
                        ]}
                        style={{marginBottom:"0em"}}
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Family Plan 2"
                        items={[
                            "Up to 4 Family Members",
                            "$84.99/month",
                            "$59 Annual Maintenence",
                            "Free for Family Members Under 16 Accompanied by Adult",
                            "All Group Fitness Classes",
                            "Special Guest Privileges",
                            "Complete Use of Gym Facilities",
                            "Fitness Consultation with a Certified Personal Trainer",
                            "No Commit, No Hassle Membership",
                            "No Contract Obligation",
                            "Cancel At Any Time with No Fees"
                        ]}
                        style={{marginBottom:"0em"}}
                    />
                </Col>
            </Row>
            <Row className="sf-home-row1" style={{paddingBottom:"3em"}}>
                <Col className="d-flex justify-content-center">
                    <SFCard
                        title="Daily Fee (No Membership)"
                        items={[
                            "$15.00 per day for Full Gym Access",
                            "$10.00 for Group Class ONLY"
                        ]} 
                    />
                </Col>
            </Row>
            {/* <Row className="sf-home-row2">
                <Col className="d-flex justify-content-center">
                    <h3 className="sf-member-header"><b>Free 7 Day Trial</b></h3>    
                </Col>
            </Row>
            <SFForm /> */}
            <SFFooter />
        </div>
    );
}

export default MembershipsScreen;