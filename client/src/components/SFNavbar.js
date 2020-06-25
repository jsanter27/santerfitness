import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Image, Row, Col } from 'react-bootstrap';
import {HouseDoorFill, CalendarDateFill, PeopleFill, EnvelopeFill, List} from 'react-bootstrap-icons';
import {LIGHT} from '../constants/Colors';

const SFNavbar = (props) => {

    const [expanded, setExpanded] = useState(false);

    const history = useHistory();

    const goToHome = () => {
        if (props.admin){
            history.push("/admin");
        }
        else{
            history.push("/");
        }
    };

    const goToSchedule = () => {
        if (props.admin){
            history.push("/admin/schedule");
        }
        else{
            history.push("/schedule");
        }
    };

    const goToMemberships = () => {
        if (props.admin){
            history.push("/admin/memberships");
        }
        else{
            history.push("/memberships");
        }
    }

    return (
        <Navbar bg="dark" variant="primary" expand="lg" expanded={expanded}>
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
                    <Nav.Link className="sf-nav-link" href={props.admin ? "#sf-footer" : null}><b>Contact</b> <EnvelopeFill color={LIGHT} /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SFNavbar;