import React from "react";
import axios from "axios";
import { Form, Button, Grid } from "semantic-ui-react";

class OpenAnswerForm extends React.Component {
  state = { name: "", qType: "", explanation: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handeSubmit = e => {
    e.preventDefault();
    const { quiz_id } = this.props;
    const question = { ...this.state, quiz_id: quiz_id, qType: "open" };

    axios.post(`/api/quizzes/${quiz_id}/questions`, question).then(res => {
      const choice = {
        answer: "",
        correct_answer: false,
        question_id: res.data.id
      };
      axios.post(`/api/questions/${res.data.id}/choices`, choice);
      this.props.addQuestion(res.data);
    });
    this.props.toggleButtons();
    this.setState({ name: "", qType: "", explanation: "" });
  };

  render() {
    document.body.style = "background: #5906A3;";
    const { name, explanation } = this.state;

    return (
      <>
        <Form style={divStyle} onSubmit={this.handeSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              required
              placeholder="Input Your Open Ended Question"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Input
            required
            placeholder="Explanation for answer"
            name="explanation"
            value={explanation}
            onChange={this.handleChange}
          />
          <Grid>
            <Grid.Column textAlign="right">
              <button
                style={{ color: "#9219FF", borderRadius: "10px" }}
                type="submit"
              >
                Submit
              </button>
            </Grid.Column>
          </Grid>
        </Form>
      </>
    );
  }
}

const divStyle = {
  backgroundColor: "white",
  textAlign: "left",
  color: "#9219FF",
  marginLeft: "5%",
  marginRight: "15%",
  borderRadius: "10px",
  paddingBottom: "2%"
};

export default OpenAnswerForm;
