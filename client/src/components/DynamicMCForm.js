import React from 'react';
import { Form, Button, Icon, } from 'semantic-ui-react'
import axios from 'axios';

class DynamicMCForm extends React.Component {
  state = { name: "", explanation: "", choices: [], addAChoice: false, choicePlaceholder: "", choiceCorrectAnswerPlaceholder: "" }

  toggleForm = () => this.setState({addAChoice: !this.state.addAChoice})

  toggle = () => this.setState({ choiceCorrectAnswerPlaceholder: !this.state.choiceCorrectAnswerPlaceholder, })

  handleChange = (e) => {
    const { name, value, } = e.target
    this.setState({ [name]: value, })
  }

  addChoice = (e) => {
    const choice = { answer: this.state.choicePlaceholder, correct_answer: this.state.choiceCorrectAnswerPlaceholder, }
    this.setState({ choices: [choice, ...this.state.choices], choicePlaceholder: "", choiceCorrectAnswerPlaceholder: false, addAChoice: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const question = { name: this.state.name, explanation: this.state.explanation, qType: "MC" }
    axios.post(`/api/quizzes/${this.props.quiz_id}/questions`, question)
      .then( res => {
        this.state.choices.map( choice => {
          axios.post(`/api/questions/${res.data.id}/choices`, choice)
        })
      })
  }


  render() {
    const { name, explanation, choices, addAChoice } =  this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
          placeholder="Question Text"
          name="name"
          value={name}
          onChange={this.handleChange}
          />
          <Form.Input
          placeholder="Explanation"
          name="explanation"
          value={explanation}
          onChange={this.handleChange}
          />
        </Form.Group>
        <ul>
          {choices.map( choice => <li>{choice.answer}:{choice.correct_answer && <p>(correct choice)</p>}</li>)}
        </ul>
        <Button onClick={this.toggleForm}>{this.state.addAChoice ? "Cancel" : "Add a Choice"}</Button>
        <Form.Group widths="equal">
          {addAChoice ? 
          <>
            <Form.Input
            placeholder="Choice text" 
            name="choicePlaceholder"
            onChange={this.handleChange}
            
            />
            <Form.Checkbox
            label="Correct Answer?"
            name="choiceCorrectAnswerPlaceholder"
            checked={this.state.choiceCorrectAnswerPlaceholder}
            onChange={this.toggle}
            />
            <Icon name="add" onClick={this.addChoice}/>
          </>
          :
          null
          }
        </Form.Group>
          <Form.Button>Submit your question</Form.Button>
        
      </Form>
    )
  }
}
export default DynamicMCForm;
    