import React from 'react';
import { Container, Row } from 'react-bootstrap';

const SFError = () => {
    return (
        <Container>
            <Row className="my-auto d-flex justify-content-center">
                <h2 className="sf-loading-text">An unexpected error has occured</h2>
            </Row>
            <Row className="my-auto d-flex justify-content-center">
                <h4 className="sf-loading-text">Please check back later</h4>
            </Row>
        </Container>
    )
}

export default SFError;