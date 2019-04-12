import React from "react";
import { Form, Input, Button, Grid, Radio, Header } from "semantic-ui-react";
import axios from "axios";

class TrueFalse extends React.Component {
  state = { name: "", correctAnswer: "", explanation: "" };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, correctAnswer, explanation } = this.state;
    const question = { name: name, qType: "TorF", explanation: explanation };
    const choice1 = {
      answer: "True",
      correct_answer: correctAnswer === true ? true : false
    };
    const choice2 = {
      answer: "False",
      correct_answer: correctAnswer === false ? true : false
    };
    const { quiz_id } = this.props;
    axios.post(`/api/quizzes/${quiz_id}/questions`, question)
      .then(res => {
        const qres = res
        axios.post(`/api/questions/${res.data.id}/choices`, choice1)
          .then(res => {
           console.log(res)
          });
        axios.post(`/api/questions/${res.data.id}/choices`, choice2)
          .then(res => {
            console.log(res)
          });
          this.props.addQuestion(qres, false)
      })

      .catch(err => console.log(err));
    this.setState({ name: "", correctAnswer: "", explanation: "" })
    this.props.toggleButtons()
  };


  render() {
    document.body.style = "background: #5906A3;";
    return (
      <Form style={divStyle} onSubmit={this.handleSubmit}>
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
          />

          <Radio
            style={{paddingLeft: '5px'}}
            name="correctAnswer"
            label="False"
            value={false}
            onChange={this.handleChange}
            checked={this.state.correctAnswer === false}
          />
        </Form.Field>
        <br />
        <Grid>
          <Grid.Column textAlign="right">
            <button style={{color: '#9219FF', borderRadius: '10px'}} type="submit">
              Submit
            </button>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default TrueFalse;

const divStyle = {
  backgroundColor: "white",
  textAlign: "left",
  color: "#9219FF",
  marginLeft: "5%",
  marginRight: "15%",
  borderRadius: "10px",
  paddingBottom: "2%"
};