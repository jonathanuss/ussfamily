import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import wordList from "./WordList.js";

class Wordle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { puzzleDate : new Date() };

    this.setPrevious = this.setPrevious.bind(this);
    this.setNext = this.setNext.bind(this);
    this.setToday = this.setToday.bind(this);
  }

  boxify(text) {
    let textChars = text.toUpperCase().split("");
    let output = [];
    let i = 1;
    textChars.forEach((char) => {
      output.push(<Button key={i++} variant="success">{char}</Button>);
    });
    return output;
  }

  setPrevious() {
    const dateOffset = (24*60*60*1000);
    const newDate = new Date(this.state.puzzleDate);
    newDate.setTime(newDate.getTime() - dateOffset);
    console.log("In setPrevious - oldDate: " + newDate.getDate());
    this.setState( { puzzleDate: new Date(newDate) } );
  }

  setNext() {
    const dateOffset = (24*60*60*1000);
    const newDate = new Date(this.state.puzzleDate);
    newDate.setTime(newDate.getTime() + dateOffset);
    console.log("In setPrevious - oldDate: " + newDate.getDate());
    this.setState( { puzzleDate: new Date(newDate) } );
  }

  setToday() {
    this.setState( { puzzleDate: new Date() } );
  }

  render() {
    const dateReference = new Date(2021, 5, 19, 0, 0, 0, 0);
    function getOffset(baseDate, currentDate) {
      const offsetDate = new Date(baseDate);
      const timeDifference =
        new Date(currentDate).setHours(0, 0, 0, 0) -
        offsetDate.setHours(0, 0, 0, 0);
      return Math.round(timeDifference / 864e5);
    }
    function getSolution(day) {
      const rawIndex = offsetForDate(day);
      const index = rawIndex % wordList.length;
      return wordList[index];
    }
    function offsetForDate(offsetDate) {
      return getOffset(dateReference, offsetDate);
    }

    const puzzleDate = this.state.puzzleDate;
    const solution = getSolution(puzzleDate);
    const dayOffset = offsetForDate(puzzleDate);

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Wordle {dayOffset}</Card.Title>
                <Card.Text>
                  {this.boxify(solution)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            {puzzleDate.toLocaleDateString("en-US")}
          </Col>
        </Row>
        <Row>
          <Col><Button variant="info" key="prev" onClick={this.setPrevious}>Previous</Button></Col>
          <Col><Button variant="info" key="today" onClick={this.setToday}>Today</Button></Col>
          <Col><Button variant="info" key="next" onClick={this.setNext}>Next</Button></Col>
        </Row>
      </Container>
    );
  }
}

export default Wordle;
