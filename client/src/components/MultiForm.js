import React from "react";
// import useForm from './useForm';
// import MultiForm from './MultiForm';
import { Grid, Button, Form, Input } from "semantic-ui-react";
import axios from "axios";

class MultiForm extends React.Component {
  state = {
    question: "",
    choiceOneA: "",
    choiceOneC: false,
    choiceTwoA: "",
    choiceTwoC: false,
    choiceThreeA: "",
    choiceThreeC: false,
    choiceFourA: "",
    choiceFourC: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClick = e => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      choiceOneA,
      choiceOneC,
      choiceTwoA,
      choiceTwoC,
      choiceThreeA,
      choiceThreeC,
      choiceFourA,
      choiceFourC,
      question
    } = this.state;
    const questions = { name: question, qType: "MC" };
    const choice1 = { answer: choiceOneA, correct_answer: choiceOneC };
    const choice2 = { answer: choiceTwoA, correct_answer: choiceTwoC };
    const choice3 = { answer: choiceThreeA, correct_answer: choiceThreeC };
    const choice4 = { answer: choiceFourA, correct_answer: choiceFourC };
    const { quiz_id } = this.props;
    axios
      .post(`/api/quizzes/${quiz_id}/questions`, questions)
      .then(res => {
        this.props.addQuestion(res.data);
        axios
          .post(`/api/questions/${res.data.id}/choices`, choice1)
          .then(res => {
            this.props.addChoice(res.data);
            console.log(res);
          });
        axios
          .post(`/api/questions/${res.data.id}/choices`, choice2)
          .then(res => {
            this.props.addChoice(res.data);
            console.log(res);
          });
        axios
          .post(`/api/questions/${res.data.id}/choices`, choice3)
          .then(res => {
            this.props.addChoice(res.data);
            console.log(res);
          });
        axios
          .post(`/api/questions/${res.data.id}/choices`, choice4)
          .then(res => {
            this.props.addChoice(res.data);
            console.log(res);
          });
      })

      .catch(err => console.log(err));

    this.setState({
      question: "",
      choiceOneA: "",
      choiceOneC: false,
      choiceTwoA: "",
      choiceTwoC: false,
      choiceThreeA: "",
      choiceThreeC: false,
      choiceFourA: "",
      choiceFourC: false
    });
  };

  render() {
    const {
      choiceOneA,
      choiceOneC,
      choiceTwoA,
      choiceTwoC,
      choiceThreeA,
      choiceThreeC,
      choiceFourA,
      choiceFourC,
      question
    } = this.state;
    document.body.style = "background: #5906A3;";

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Input
            focus
            size="large"
            type="text"
            placeholder="Question"
            name="question"
            value={question}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Group>
          <Form.Field inline width={10}>
            <Input
              label="A ) "
              placeholder="Enter an answer"
              name="choiceOneA"
              value={choiceOneA}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="checkbox"
              label="Answer ?"
              name="choiceOneC"
              value={choiceOneC}
              onClick={this.handleClick}
            />
          </Form.Field>
          Correct Answer
        </Form.Group>
        <Form.Group>
          <Form.Field inline width={10}>
            <Input
              label="B ) "
              width={10}
              placeholder="Enter an answer"
              name="choiceTwoA"
              value={choiceTwoA}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="checkbox"
              label="Answer ?"
              name="choiceTwoC"
              value={choiceTwoC}
              onClick={this.handleClick}
            />
          </Form.Field>
          Correct Answer
        </Form.Group>
        <Form.Group>
          <Form.Field inline width={10}>
            <Input
              label="C ) "
              width={10}
              placeholder="Enter an answer"
              name="choiceThreeA"
              value={choiceThreeA}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="checkbox"
              label="Answer ?"
              name="choiceThreeC"
              value={choiceThreeC}
              onClick={this.handleClick}
            />
          </Form.Field>
          Correct Answer
        </Form.Group>
        <Form.Group>
          <Form.Field inline width={10}>
            <Input
              label="D ) "
              placeholder="Enter an answer"
              name="choiceFourA"
              value={choiceFourA}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="checkbox"
              label="Answer ?"
              name="choiceFourC"
              value={choiceFourC}
              onClick={this.handleClick}
            />
          </Form.Field>
          Correct Answer
        </Form.Group>
        <Grid>
          <Grid.Column textAlign="right">
            <Button circular inverted size="big" type="submit" color="pink">
              Submit
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default MultiForm;
