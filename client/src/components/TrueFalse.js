import React from 'react'
import { Form, Input, Button, Grid, Radio, } from 'semantic-ui-react';
import axios from 'axios';

class TrueFalse extends React.Component {
  state = { name: "", correctAnswer: "" }

  toggleTF = (value) => {
    this.setState({ correctAnswer: value })
  }
  handleChange =  (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value,})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, correctAnswer} = this.state;
    const question = { name: name, qType: "TorF", explanation: correctAnswer.toString}
    const { quiz_id, } =  this.props;
    axios.post(`/api/quizzes/${quiz_id}/questions`, question)
      .then( res => console.log(res))
      .catch( err => console.log(err))

  }
  render () {
    document.body.style = 'background: #6D55A3;'
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Input 
          placeholder='Type your true or false question here'
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          />
        </Form.Field>
        {/* <Button.Group>
          <Button inverted onClick={() => this.toggleTF(true)} >TRUE</Button>
          <Button.Or />
          <Button inverted onClick={() => this.toggleTF(false)}>FALSE</Button>
        </Button.Group> */}
        <Form.Field>
          <Radio
          name="radioGroup"
          label="True"
          value={true}
          onClick={() => this.toggleTF(true)}

          />
          <Radio
          name="radioGroup"
          label="False"
          value={false}
          onClick={() => this.toggleTF(false)}

          />
        </Form.Field>
        <br/>
        <Grid>
          <Grid.Column textAlign="right">
            <Button circular inverted size="big" type='submit'>Submit</Button>
          </Grid.Column>
        </Grid>
      </Form>
      )
    }
  
}

export default TrueFalse
