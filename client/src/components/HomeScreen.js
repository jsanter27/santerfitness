import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Carousel, Container, Row, Col, Image } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaRunning } from 'react-icons/fa';
import { GiWeightLiftingUp, GiMeditation } from 'react-icons/gi';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';
import SFCard from './SFCard';
import SFAlert from './SFAlert';
import SFLoading from './SFLoading';
import SFError from './SFError';

const GET_SLIDES = gql`
    query{
        getAllSlides{
            key
            url
        }
    }
`;

const GET_ACTIVE_ALERTS = gql`
    query{
        getActiveAlerts{
            message
            isEmergency
        }
    }
`;

const HomeScreen = () => {

    const useHomeScreenQueries = () => {
        const slides = useQuery(GET_SLIDES);
        const alerts = useQuery(GET_ACTIVE_ALERTS);
        return {slides, alerts};
    }

    const { slides, alerts } = useHomeScreenQueries();



    if (slides.loading || alerts.loading)
        return (
            <SFLoading />
        )
    if (slides.error || alerts.error) {
        return (
            <SFError />
        )
    }

    let data = {
        slides: slides.data.getAllSlides,
        alerts: alerts.data.getActiveAlerts
    };

    return (
        <div>
            <SFNavbar />
            {data.alerts.map((alert, index) => 
                <SFAlert key={index} message={alert.message} isEmergency={alert.isEmergency} />
            )}
            {data.slides ?
                <Carousel>
                    {data.slides.map((slide) => 
                        <Carousel.Item>
                            <Image
                                key={slide.key}
                                src={slide.url}
                                alt={slide.key}
                                className="d-block w-100 sf-home-slide"
                            />
                        </Carousel.Item>
                    )}
                </Carousel>
            : null}
            <Row className="sf-home-row1">
                <IconContext.Provider value={{className:"fitness-icons", size:64}}>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={FaRunning}
                            title="Endurance"
                            items={[
                                "Placeholder 1", 
                                "Placeholder 2"
                            ]}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={GiMeditation}
                            title="Health"
                            items={[
                                "Placeholder 1", 
                                "Placeholder 2"
                            ]}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={GiWeightLiftingUp}
                            title="Strength"
                            items={[
                                "Placeholder 1", 
                                "Placeholder 2"
                            ]}
                        />
                    </Col>
                </IconContext.Provider>
            </Row>
            <Row className="sf-home-row1">
                <h3 className="sf-home-header">
                    <b>About</b>
                </h3>
            </Row>
            <Row className="sf-home-row1">
                <p className="sf-home-body">
                    This is the about section.
                </p>
            </Row>
            <SFFooter />
        </div>
    );
}

export default HomeScreen;