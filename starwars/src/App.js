import React, { useState, useEffect } from 'react';
import axios from "axios";
import PeopleCard from "./components/PeopleCard";
import PageButtons from "./components/PageButtons";
import { Container, Row } from 'reactstrap';
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  const [peopleData, setPeopleData] = useState({ 1: { results: [] } });
  const [currentPage, setCurrentPage] = useState(1);
  const [renderCards, setRenderCards] = useState(<div />);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  useEffect(() => {
    console.log('test');
    const pageSetup = () => {
      peopleData[currentPage].next ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
      peopleData[currentPage].previous ? setPrevBtnDisabled(false) : setPrevBtnDisabled(true);
      setRenderCards(peopleData[currentPage].results.map((person, index) => <PeopleCard key={index} props={person} />));
    }

    if (!peopleData[currentPage] || !peopleData[currentPage].results.length) {
      console.log('fetching data');
      axios.get(`https://swapi.co/api/people/?page=${currentPage}`)
        .then(res => {
          const newPeopleData = peopleData;
          newPeopleData[currentPage] = res.data;
          // const newPeopleData = { ...peopleData, [currentPage]: res.data }
          console.log(newPeopleData);
          setPeopleData(newPeopleData)
          pageSetup();
        })
        .catch(err => console.log(err));
    } else {
      pageSetup();
    }
  }, [currentPage, peopleData]);

  const pageButtonClick = (e) => {
    if (e.target.classList.contains("next")) {
      setCurrentPage(currentPage + 1);
    } else if (e.target.classList.contains('prev')) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      <PageButtons pageButtonClick={pageButtonClick} prevDisabled={prevBtnDisabled} nextDisabled={nextBtnDisabled} />
      <Container>
        <Row>
          {renderCards}
        </Row>
      </Container>
      <PageButtons pageButtonClick={pageButtonClick} prevDisabled={prevBtnDisabled} nextDisabled={nextBtnDisabled} />
    </div>
  );
}

export default App;
