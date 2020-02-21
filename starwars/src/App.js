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
  const [peopleData, setPeopleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  useEffect(() => {
    axios.get(`https://swapi.co/api/people/?page=${currentPage}`)
      .then(res => {
        setPeopleData(res.data.results);
        res.data.next ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
        res.data.previous ? setPrevBtnDisabled(false) : setPrevBtnDisabled(true);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

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
          {peopleData.map((person, index) => <PeopleCard key={index} props={person} />)}
        </Row>
      </Container>
      <PageButtons pageButtonClick={pageButtonClick} prevDisabled={prevBtnDisabled} nextDisabled={nextBtnDisabled} />
    </div>
  );
}

export default App;
