import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import {HouseDoorFill, CalendarDateFill, PeopleFill, EnvelopeFill} from 'react-bootstrap-icons';
import {LIGHT} from '../constants/Colors';

const SFNavbar = () => {

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
                    <Nav.Link href="/">Home <HouseDoorFill color={LIGHT} /></Nav.Link>
                    <Nav.Link href="/schedule">Schedule <CalendarDateFill color={LIGHT} /></Nav.Link>
                    <Nav.Link href="/memberships">Memberships <PeopleFill color={LIGHT} /></Nav.Link>
                    <Nav.Link href="/contact">Contact <EnvelopeFill color={LIGHT} /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SFNavbar;