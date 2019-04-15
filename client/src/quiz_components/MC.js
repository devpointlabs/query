import React from "react";
import axios from "axios";
import styled from "styled-components";
import { List, Radio, Form } from "semantic-ui-react";

class MC extends React.Component {
  state = { answer: "", choice_id: "", press: true };

  handleOptionChange = changeEvent => {
    let student_answer = changeEvent.target.value;
    let id = changeEvent.target.id;
    this.setState({ answer: student_answer, choice_id: id });
  };

  componentDidUpdate() {
    const student_answer = this.state.answer;
    const choice_id = this.state.choice_id;
    if (this.props.press && this.state.press) {
      this.setState({ press: false });
      this.props.addStudentAnswer(student_answer, choice_id);
    }
  }

  render() {
    return (
      <ListItem>
        <strong style={{ fontFamily: "menlo" }}>{this.props.question}</strong>
        {/* <fieldset> */}
        {this.props.choices.map(choice => {
          return (
            <ChoiceItem key={choice.id}>
              <input
                type="radio"
                name={choice.answer}
                id={choice.id}
                value={choice.answer}
                onChange={this.handleOptionChange}
                checked={this.state.answer === choice.answer}
              />
              {choice.answer}
            </ChoiceItem>
          );
        })}
        {/* </fieldset> */}
      </ListItem>
    );
  }
}

const ListItem = styled.li`
  padding: 10px;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  list-style-type: none;
  font-family: menlo;
`;
const ChoiceItem = styled.li`
  margin: 10px;
  font-size: 1rem;
  list-style-type: none;
  font-family: menlo;
`;

export default MC;
