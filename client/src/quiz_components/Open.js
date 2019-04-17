import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Form, TextArea } from "semantic-ui-react";

class Open extends React.Component {
  state = { answer: "", choice_id: "", press: true };

  componentDidUpdate() {

    const student_answer = this.state.answer;
    const choice_id = this.state.choice_id;
    if (this.props.press && this.state.press) {
      this.setState({ press: false });
      this.props.addStudentAnswer(student_answer, choice_id);
    }
  }

  handleOptionChange = changeEvent => {
    let student_answer = changeEvent.target.value;
    let id = changeEvent.target.id;
    this.setState({ answer: student_answer, choice_id: id });
  };

  render() {
    return (
      <ListItem>
        <strong style={{ fontFamily: "menlo" }}>{this.props.question}</strong>
        <br />
        <br />
        <Form>
          <TextArea
            style={{ fontFamily: "menlo" }}
            placeholder="Input your answer..."
            name="answer"
            value={this.state.answer}
            onChange={this.handleOptionChange}
          />
        </Form>
      </ListItem>
    );
  }
}

const ListItem = styled.li`
  padding: 10px;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  list-style-type: none;
`;
const ChoiceItem = styled.li`
  margin: 10px;
  font-size: 1rem;
  list-style-type: none;
`;

export default Open;
