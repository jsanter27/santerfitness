import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Carousel, Row, Col, Image, Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaRunning } from 'react-icons/fa';
import { GiWeightLiftingUp, GiMeditation } from 'react-icons/gi';

import SFNavbar from './SFNavbar';
import SFFooter from './SFFooter';
import SFCard from './SFCard';
import SFAlert from './SFAlert';
import SFLoading from './SFLoading';
import SFError from './SFError';

const GET_HOME = gql`
    query{
        getAllSlides{
            _id
            key
            url
            lastModifiedBy
        }
        getAllAlerts{
            _id
            message
            isActive
            isEmergency
            lastModifiedBy
        }
    }
`;

const HomeScreen = (props) => {

    var { data, loading, error } = useQuery(GET_HOME);

    if (props.admin){
        data = props.admin.data;
        loading = props.admin.loading;
        error = props.admin.error;  
    }

    if (loading ){
        return <SFLoading />
    }
    if (error) {
        return <SFError />
    }

    const handleAlertClick = () => {
        window.open("https://mobile-text-alerts.com/subscribe/SanterFitness", "_blank");
    };

    return (
        <div>
            <SFNavbar admin={props.admin} />
            {data.getAllAlerts.filter( (alert) => alert.isActive ).map((alert, index) => 
                <SFAlert key={index} message={alert.message} isEmergency={alert.isEmergency} />
            )}
            {data.getAllSlides ?
                <Carousel>
                    {data.getAllSlides.map((slide) => 
                        <Carousel.Item key={slide.key}>
                            <Image
                                src={slide.url}
                                alt={slide.key}
                                className="d-block w-100 sf-home-slide"
                            />
                        </Carousel.Item>
                    )}
                </Carousel>
            : null}
            <Row className="sf-home-row2 d-flex justify-content-center" style={{padding:".5em", textAlign:"center"}}>
                <h4 className="sf-home-header">
                    <b>Sign up for Alerts and Notifications!</b>
                </h4>
            </Row>
            <Row className="sf-home-row1 d-flex justify-content-center">
                <Button className="sf-home-button" variant="dark" size="lg" block onClick={handleAlertClick}>Sign Up</Button>
            </Row>
            <Row className="sf-home-row2 d-flex justify-content-center" style={{padding: ".5em", textAlign:"center"}}>
                <h4 className="sf-home-header">
                    <b>Our Goals</b>
                </h4>
            </Row>
            <Row className="sf-home-row1" xs={1} sm={3} style={{paddingBottom:"2em"}}>
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
                    <b>Santer Fitness</b>
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