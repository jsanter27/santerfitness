import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import {HouseDoorFill, CalendarDateFill, PeopleFill, EnvelopeFill} from 'react-bootstrap-icons';
import {LIGHT} from '../constants/Colors';

const SFNavbar = () => {

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
        <Navbar bg="dark" variant="primary">
            <Navbar.Brand href="/">
                <Image 
                    src="/sf_logo1.jpg"
                    width="180"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Santer Fitness Logo"
                    rounded
                />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="justify-content-end" style={{width:"100%"}}>
                    <Nav.Link onClick={goToHome}>Home <HouseDoorFill color={LIGHT} /></Nav.Link>
                    <Nav.Link onClick={goToSchedule}>Schedule <CalendarDateFill color={LIGHT} /></Nav.Link>
                    <Nav.Link onClick={goToMemberships}>Memberships <PeopleFill color={LIGHT} /></Nav.Link>
                    <Nav.Link href="#sf-footer">Contact <EnvelopeFill color={LIGHT} /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SFNavbar;