import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Carousel, Row, Col, Image, Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaDoorOpen, FaRulerHorizontal, FaDumbbell, FaSprayCan } from 'react-icons/fa';

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
        return <SFError error={error}/>
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
            {data.getAllSlides !== null ?
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
            {/* COVID GUIDELINES 
            <Row className="sf-covid-row d-flex justify-content-center" style={{padding: ".5em", textAlign:"center"}}>
                <h4 className="sf-home-header">
                    <b>COVID-19 GUIDELINES</b>
                </h4>
            </Row>
            <Row className="sf-home-row1" xs={1} md={4} style={{paddingBottom:"2em"}}>
                <IconContext.Provider value={{className:"fitness-icons", size:64}}>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={FaDoorOpen}
                            title="Entry/Sign In"
                            items={[
                                "Masks must ALWAYS be worn by EVERYONE", 
                                "33% occupancy limit",
                                "Required sign-in with contact info and health pre-screening form"
                            ]}
                            covid
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={FaRulerHorizontal}
                            title="Distancing"
                            items={[
                                "6 feet of separation at ALL times", 
                                "Signs and reminders will be posted throughout facility",
                                "Some equipment may be clearly marked out of use for cleaning and distancing purposes"
                            ]}
                            covid
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={FaDumbbell}
                            title="Classes"
                            items={[
                                "All classes by reservation only, sign up at front desk", 
                                "Capacities will be capped to ensure maximum social distancing",
                                "Additional time for cleaning and disinfection in between classes",
                                "Childcare temporarily CLOSED"
                            ]}
                            covid
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <SFCard
                            icon={FaSprayCan}
                            title="Cleaning/Hygiene"
                            items={[
                                "Additional stations with hand sanitizer and medical-grade supplies for wiping down equipment after use", 
                                "Shared equipment must be cleaned after every use",
                                "Staff will clean and disinfect restrooms hourly and equipment in between uses"
                            ]}
                            covid
                        />
                    </Col>
                </IconContext.Provider>
            </Row>
            */}
            <Row className="sf-home-row2 d-flex justify-content-center">
                <h3 className="sf-home-header">
                    <b>About</b>
                </h3>
            </Row>
            <Row className="sf-home-row1" style={{paddingTop:"1em"}}>
                <p className="sf-home-body">
                    At Santer Fitness you can expect a full service, community-based health club focused on providing our
                    members with best in class fitness and performance enhancement programs and services. We offer
                    results-driven personal training programs, and innovative group exercise programming. Featuring:
                    <br/><br/>
                </p>
            </Row>
            <Row className="sf-home-row1 d-flex justify-content-center">
                <p className="sf-home-body" style={{textAlign:"center", marginLeft:"0em"}}>
                    <b>Full Group Exercise Classes with Certified Instructors<br/><br/>
                    All NEW Precor ® and Hammer Strength® Equipment<br/><br/>
                    Tons of Cardio with Personal HD 17″ LCD TV Screens<br/><br/>
                    FREE 1 hr Private Assessment &amp; Fitness Consultation<br/><br/>
                    FREE Child Care Available<br/><br/>
                    Great Shake Bar and Café<br/><br/>
                    Certified Personal Training Available<br/><br/>
                    Silver Sneakers programs<br/><br/>
                    Full Dumbbells Sets up to 150 lbs<br/><br/></b>
                </p>
            </Row>
            <SFFooter />
        </div>
    );
}

export default HomeScreen;