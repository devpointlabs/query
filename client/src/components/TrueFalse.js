import React from "react";
import { Form, Input, Button, Grid, Radio, Header } from "semantic-ui-react";
import axios from "axios";

class TrueFalse extends React.Component {
  state = { name: "", correctAnswer: "", explanation: "" };

  toggleTF = value => {
    this.setState({ correctAnswer: value });
  };
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, correctAnswer, explanation } = this.state;
    const question = { name: name, qType: "TorF", explanation: explanation };
    const choice1 = {
      answer: "true",
      correct_answer: correctAnswer === true ? true : false
    };
    const choice2 = {
      answer: "false",
      correct_answer: correctAnswer === false ? true : false
    };
    const { quiz_id } = this.props;
    axios
      .post(`/api/quizzes/${quiz_id}/questions`, question)
      .then(res => {
        this.props.addQuestion(res.data);
        axios.post(`/api/questions/${res.data.id}/choices`, choice1)
          .then(res => {
            this.props.addChoice(res.data);
          });
        axios.post(`/api/questions/${res.data.id}/choices`, choice2)
          .then(res => {
            this.props.addChoice(res.data);
          });
      })

      .catch(err => console.log(err));
      this.setState({ name: "", correctAnswer: "", explanation: ""})
  };


  render() {
    document.body.style = "background: #6D55A3;";
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Input
            placeholder="Type your true or false question here"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            placeholder="Explanation for why correct answer is correct"
            name="explanation"
            value={this.state.explanation}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Header as="h3" inverted>
            Correct Answer is:
          </Header>
          <Radio
            name="correctAnswer"
            label="True"
            value={true}
            onChange={this.handleChange}
            checked={this.state.correctAnswer === true}
            // onClick={() => this.toggleTF(true)}
          />
          <Radio
            name="correctAnswer"
            label="False"
            value={false}
            onChange={this.handleChange}
            checked={this.state.correctAnswer === false}
            // onClick={() => this.toggleTF(false)}
          />
        </Form.Field>
        <br />
        <Grid>
          <Grid.Column textAlign="right">
            <Button circular inverted size="big" type="submit">
              Submit
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default TrueFalse;
