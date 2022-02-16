import React from "react";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import {wordList, oldWordList} from "./WordList.js";

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
      output.push(<span key={i++} className="greenbox">{char}</span>);
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
    function getSolution(day, list) {
      const rawIndex = offsetForDate(day);
      const index = rawIndex % list.length;
      return list[index];
    }
    function offsetForDate(offsetDate) {
      return getOffset(dateReference, offsetDate);
    }

    const puzzleDate = this.state.puzzleDate;
    const solution = getSolution(puzzleDate, wordList);
    const oldSolution = getSolution(puzzleDate, oldWordList);
    const dayOffset = offsetForDate(puzzleDate);

    return (
      <Stack fluid direction='vertical'>
        <p>Wordle {dayOffset}</p>
        <div>(NYT Version Solution): {this.boxify(solution)}</div>
        <div className="diminished">(Original Wordle Solution): {oldSolution}</div>
        <p>{puzzleDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div>
          <Button variant="info" key="prev" className="buttons" onClick={this.setPrevious}>-</Button>
          <Button variant="info" key="today" className="buttons" onClick={this.setToday}>Today</Button>
          <Button variant="info" key="next" className="buttons" onClick={this.setNext}>+</Button>
        </div>
      </Stack>
    );
  }
}

export default Wordle;
