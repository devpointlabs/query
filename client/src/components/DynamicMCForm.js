import React from 'react';
import { Form, Button, Icon, Header, } from 'semantic-ui-react'
import axios from 'axios';

class DynamicMCForm extends React.Component {
  state = { name: "", explanation: "", choices: [], addAChoice: false, choicePlaceholder: "", choiceCorrectAnswerPlaceholder: false }

  toggleForm = () => this.setState({addAChoice: !this.state.addAChoice})

  toggle = () => this.setState({ choiceCorrectAnswerPlaceholder: !this.state.choiceCorrectAnswerPlaceholder, })

  handleChange = (e) => {
    const { name, value, } = e.target
    this.setState({ [name]: value, })
  }

  addChoice = (e) => {
    e.preventDefault();
    const choice = { answer: this.state.choicePlaceholder, correct_answer: this.state.choiceCorrectAnswerPlaceholder, }
    this.setState({ choices: [choice, ...this.state.choices], choicePlaceholder: "", choiceCorrectAnswerPlaceholder: false, addAChoice: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const question = { name: this.state.name, explanation: this.state.explanation, qType: "MC" }
    axios.post(`/api/quizzes/${this.props.quiz_id}/questions`, question)
      .then( res => {
        const qres = res
        this.state.choices.map( choice => (
          axios.post(`/api/questions/${qres.data.id}/choices`, choice)
          .then( x =>{console.log(x)})
        ))
              axios.get(`/api/questions/${qres.data.id}/choices`)
              .then( res => {
              this.props.addQuestion({...qres.data, choices: [...res.data]})
            })
          })
    this.props.toggleForm()
    this.props.toggleButtons()
  }

  render() {
    const { name, explanation, choices, addAChoice } =  this.state
    return (
      <Form style={divStyle} onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
          placeholder="Question Text"
          name="name"
          value={name}
          onChange={this.handleChange}
          required
          />
          <Form.Input
          placeholder="Explanation"
          name="explanation"
          value={explanation}
          onChange={this.handleChange}
          required
          />
        </Form.Group>
        {choices.length > 0 && <Header as="h4" >Choices</Header>}
        <ul>
          {choices.map( choice => <li key={choice.id}>{choice.answer}
           {choice.correct_answer && <span> (correct choice)</span>}
           </li>)}
        </ul>

        <button style={{color: '#9219FF'}} type="button" onClick={this.toggleForm}>{this.state.addAChoice ? "Cancel" : "Add a Choice"}</button>

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

        <div style={{textAlign: 'right'}}>

          <button style={{ color: '#9219FF', borderRadius: '10px'}} type='submit'>Submit</button>
        </div>
        <br />

      </Form>
    )
  }}
  
export default DynamicMCForm;
    
const divStyle = {
  backgroundColor: "white",
  textAlign: "left",
  color: "#9219FF",
  marginLeft: "5%",
  marginRight: "15%",
  borderRadius: "10px",
  paddingBottom: "2%"
};