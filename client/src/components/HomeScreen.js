import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaRunning } from 'react-icons/fa';
import { GiWeightLiftingUp, GiMeditation } from 'react-icons/gi';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';

const HomeScreen = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setSlideIndex(selectedIndex);
    };

    return (
        <Container fluid="lg">
            <SFNavbar />
            <Carousel activeIndex={slideIndex} onSelect={handleSelect}>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1729bff7d41%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1729bff7d41%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22289.7249984741211%22%20y%3D%22221.24000091552733%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        alt="First Slide"
                    />
                    <Carousel.Caption>
                        <h3>Header 1</h3>
                        <p>This is the body of the first slide.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1729bff7d43%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1729bff7d43%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23282c34%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22251.97500610351562%22%20y%3D%22221.24000091552733%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        alt="Second Slide"
                    />
                    <Carousel.Caption>
                        <h3>Header 2</h3>
                        <p>This is the body of the second slide.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Row className="sf-home-row">
                <IconContext.Provider value={{className:"fitness-icons", size:64}}>
                    <Col className="d-flex justify-content-center">
                        <Card className="sf-home-card text-center">
                            <Card.Header className="sf-home-card-header"><FaRunning /></Card.Header>
                            <Card.Body>
                                <Card.Title className="sf-home-card-title d-flex justify-content-center">
                                    Endurance
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Card className="sf-home-card text-center">
                            <Card.Header className="sf-home-card-header"><GiMeditation /></Card.Header>
                            <Card.Body>
                                <Card.Title className="sf-home-card-title d-flex justify-content-center">
                                    Flexibility
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Card className="sf-home-card text-center">
                            <Card.Header className="sf-home-card-header"><GiWeightLiftingUp /></Card.Header>
                            <Card.Body>
                                <Card.Title className="sf-home-card-title d-flex justify-content-center">
                                    Strength
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </IconContext.Provider>
            </Row>
            <Row className="sf-home-row">
                <h3 id="sf-home-about-header">
                    About
                </h3>
            </Row>
            <Row className="sf-home-row">
                <p id="sf-home-about-body">
                    This is the about section.
                </p>
            </Row>
            <SFFooter />
        </Container>
    );
}

export default HomeScreen;