import React from "react";
import axios from "axios";
import { Form, Input, Button, Grid } from "semantic-ui-react";

class OpenAnswerForm extends React.Component {
  state = { name: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handeSubmit = e => {
    e.preventDefault();
    const { match: { params: { id } }, history: { push } } = this.props
    const question = { ...this.state, quiz_id: id};
    debugger
    axios.post(`/api/quizzes/${id}/questions`, question).then(res => {
      push.this.props.history(`/quizzes/${id}`);
    });
    this.setState({ name: "" });
  };

  render() {
    document.body.style = "background: #6D55A3;";
    const { name } = this.state;

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
