import React from "react";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ToggleButton from 'react-bootstrap/ToggleButton'

import {wordList, oldWordList} from "./WordList.js";

class Wordle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { puzzleDate : new Date(), spoilFuture: false };

    this.setPrevious = this.setPrevious.bind(this);
    this.setNext = this.setNext.bind(this);
    this.setToday = this.setToday.bind(this);
    this.toggleSpoilFuture = this.toggleSpoilFuture.bind(this);
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

  toggleSpoilFuture() {
    this.setState( { spoilFuture: !this.state.spoilFuture });
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
    function getSolution(day, list, spoilFuture, disableSpoilToggle) {
      // if the disableSpoilToggle is false it means the date is today or in the future
      // in that case, if the spoilFuture toggle is false, return a masked value
      if (!disableSpoilToggle && !spoilFuture) {
        return "?????";
      }

      // it's either a past solution or they are okay with being spoiled
      const rawIndex = offsetForDate(day);
      const index = rawIndex % list.length;
      return list[index];
    }
    function offsetForDate(offsetDate) {
      return getOffset(dateReference, offsetDate);
    }

    const puzzleDate = this.state.puzzleDate;
    const spoilFuture = this.state.spoilFuture;
    let disableSpoilToggle = false;
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    if (today.getTime() < puzzleDate.getTime()) {
      disableSpoilToggle = false;
    } else {
      disableSpoilToggle = true;
    }

    const solution = getSolution(puzzleDate, wordList, spoilFuture, disableSpoilToggle);
    const oldSolution = getSolution(puzzleDate, oldWordList, spoilFuture, disableSpoilToggle);
    const dayOffset = offsetForDate(puzzleDate);

    return (
      <Stack fluid direction='vertical'>
        <p>Wordle {dayOffset}</p>
        <div className="diminished">(NYT Version Solution):</div>
        <div className="solution">{this.boxify(solution)}</div>
        <div className="diminished">(Original Wordle Solution): {oldSolution}</div>
        <div>{puzzleDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div>
          <Button variant="info" key="prev" className="buttons" onClick={this.setPrevious}>-</Button>
          <Button variant="info" key="today" className="buttons" onClick={this.setToday}>Today</Button>
          <Button variant="info" key="next" className="buttons" onClick={this.setNext}>+</Button>
        </div>
        <div>
          <ToggleButton id="toggle-check" type="checkbox" variant="outline-danger" checked={spoilFuture} value="1" onChange={this.toggleSpoilFuture} disabled={disableSpoilToggle}>
            Spoil It
          </ToggleButton>
        </div>
      </Stack>
    );
  }
}

export default Wordle;
