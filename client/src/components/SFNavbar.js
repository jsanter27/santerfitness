import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Image, Row, Col } from 'react-bootstrap';
import {HouseDoorFill, CalendarDateFill, PeopleFill, EnvelopeFill, List} from 'react-bootstrap-icons';
import {LIGHT} from '../constants/Colors';

const SFNavbar = () => {

    const [expanded, setExpanded] = useState(false);

    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    };

    const goToSchedule = () => {
        history.push("/schedule");
    };

    const goToMemberships = () => {
        history.push("/memberships");
    }

    return (
        <Navbar bg="dark" variant="primary" expand="sm" expanded={expanded}>
            <Row>
                <Col xs={8}>
                    <Navbar.Brand>
                        <Image
                            src="/sf_logo1.jpg"
                            className="sf-logo-img"
                            alt="Santer Fitness Logo"
                            rounded
                            onClick={goToHome}
                        />
                    </Navbar.Brand>
                </Col>
                <Col className="sf-nav-toggle">
                    <Navbar.Toggle className="sf-navbar-brand" onClick={() => setExpanded(expanded ? false : "expanded")}><List color={LIGHT} size="2.25em"/></Navbar.Toggle>
                </Col>
            </Row>
            <Navbar.Collapse>
                <Nav className="justify-content-end" style={{width:"100%"}}>
                    <Nav.Link className="sf-nav-link" onClick={goToHome}><b>Home</b> <HouseDoorFill color={LIGHT} /></Nav.Link>
                    <Nav.Link className="sf-nav-link" onClick={goToSchedule}><b>Classes</b> <CalendarDateFill color={LIGHT} /></Nav.Link>
                    <Nav.Link className="sf-nav-link" onClick={goToMemberships}><b>Memberships</b> <PeopleFill color={LIGHT} /></Nav.Link>
                    <Nav.Link className="sf-nav-link" href="#sf-footer"><b>Contact</b> <EnvelopeFill color={LIGHT} /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SFNavbar;