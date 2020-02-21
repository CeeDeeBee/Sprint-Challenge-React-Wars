import React from "react";
import {
    Card, Button, CardHeader, CardBody,
    CardText, Col
} from 'reactstrap';
import styled from "styled-components";

const StyledCard = styled(Card)`
    margin: 4% auto;
`;

const PeopleCard = ({ props }) => {
    return (
        <Col sm="12" md="4">
            <StyledCard>
                <CardHeader><h2>{props.name}</h2></CardHeader>
                <CardBody>
                    <CardText>Gender: {props.gender}</CardText>
                    <CardText>Birth Year: {props.birth_year}</CardText>
                    <CardText>Hair Color: {props.hair_color}</CardText>
                    <CardText>Height: {props.height}</CardText>
                    <Button>More Info</Button>
                </CardBody>
            </StyledCard>
        </Col>
    )
}

export default PeopleCard;