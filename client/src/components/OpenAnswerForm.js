import React from "react";
import axios from "axios";
import { Form, Button, Grid } from "semantic-ui-react";

class OpenAnswerForm extends React.Component {
  state = { name: "", qType: "" };

  handleChange = (e, { name, value, }) => this.setState({ [name]: value,});

  handeSubmit = e => {
    e.preventDefault();
    const { quiz_id } = this.props;
    const question = { ...this.state, quiz_id: quiz_id, qType: "open" };
    axios.post(`/api/quizzes/${quiz_id}/questions`, question).then(res => {
      this.props.addQuestion(res.data);
      console.log(res);
    });
    this.setState({ name: "", qType: "" });
  };

  render() {
    document.body.style = "background: #6D55A3;";
    const { name, } = this.state;

    return (
      <>
        <Form onSubmit={this.handeSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              required
              placeholder="Input Your Open Ended Question"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Grid>
            <Grid.Column textAlign="right">
              <Button circular inverted size="big" type="submit">
                Submit
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </>
    );
  }
}

export default OpenAnswerForm;
