import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';
import { LIGHT } from '../constants/Colors';

const SFLoading = () => {
    return (
        <Container>
            <Row className="my-auto d-flex justify-content-center">
                <h2 className="sf-loading-text"><b>Loading...</b></h2>
            </Row>
            <Row className="my-auto d-flex justify-content-center">
                <BounceLoader color={LIGHT} size="5em"/>
            </Row>
        </Container>
    )
}

export default SFLoading;