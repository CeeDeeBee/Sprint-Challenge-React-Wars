import React from "react";
import { Button } from 'reactstrap';
import styled from "styled-components";

const PageButtonsDiv = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    Button {
        margin: 2% 0;
    }
`;

const PageButtons = ({ pageButtonClick, prevDisabled, nextDisabled }) => {
    return (
        <PageButtonsDiv>
            <Button className="prev" onClick={pageButtonClick} disabled={prevDisabled} >{"< Prev"}</Button>
            <Button className="next" onClick={pageButtonClick} disabled={nextDisabled}>{"Next >"}</Button>
        </PageButtonsDiv>
    )
}

export default PageButtons;