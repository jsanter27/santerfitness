import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const SFCard = (props) => {

    let Icon = props.icon;
    let title = props.title;
    let items = props.items;
    let covid = props.covid;

    let style=null;
    if (props.style)
        style=props.style;
    const renderIcon = () => {
        if (Icon){
            return (
                <Card.Header className={covid ? "sf-covid-card-header" : "sf-home-card-header"}><Icon /></Card.Header>
            );
        }
    };

    const renderTitle = () => {
        if (title){
            return (
                <Card.Body className={covid ? "sf-covid-card-body" : "sf-home-card-body"}>
                    <Card.Title className="sf-home-card-title">
    <                   b>{title}</b>
                    </Card.Title>
                </Card.Body>
            );
        }
    };

    const renderItems = () => {
        if (items){
            return (
                <ListGroup  className="sf-home-card-text" variant="flush">
                    {items.map( (item, index) =>
                        <ListGroup.Item key={index}>{item}</ListGroup.Item>
                    )}
                </ListGroup>
            );
        }
    };

    return (
        <Card className="sf-home-card text-center" style={style}>
            {renderIcon()}
            {renderTitle()}
            {renderItems()}
        </Card>
    );
}

export default SFCard;