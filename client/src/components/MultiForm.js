import React from 'react';
// import useForm from './useForm';
// import MultiForm from './MultiForm';
import {Button, Form, Input} from 'semantic-ui-react';
import axios from 'axios'

class MultiForm extends React.Component {
  state = {
    question: '',
    choiceOneA: '', 
    choiceOneC: false,
    choiceTwoA: '', 
    choiceTwoC: false,
    choiceThreeA: '', 
    choiceThreeC: false,
}

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value})
}

  handleClick = e => {
    const {name, checked} = e.target
    this.setState({ [name]: checked }) 
  }

handleSubmit = (e) => {
    e.preventDefault();
    const { choiceOneA, choiceOneC, choiceTwoA, choiceTwoC, choiceThreeA, choiceThreeC, question, } = this.state
    const questions = { name: question, qType: "MC", }
    const choice1 = { answer: choiceOneA, correct_answer: choiceOneC }
    const choice2 = { answer: choiceTwoA, correct_answer: choiceTwoC }
    const choice3 = { answer: choiceThreeA, correct_answer: choiceThreeC }
    const { quiz_id, } =  this.props;
    axios.post(`/api/quizzes/${quiz_id}/questions`, questions)
      .then( res => {
        axios.post(`/api/questions/${res.data.id}/choices`, choice1)
          .then(res => {
            console.log(res)
          })
        axios.post(`/api/questions/${res.data.id}/choices`, choice2)
          .then(res => {
            console.log(res)
          })
        axios.post(`/api/questions/${res.data.id}/choices`, choice3)
          .then(res => {
            console.log(res)
          })
        })

      .catch( err => console.log(err))
      
}
  

  render () {
    const { choiceOneA, choiceOneC, choiceTwoA, choiceTwoC, choiceThreeA, choiceThreeC, question, } = this.state
 document.body.style = 'background: #6D55A3;'

    return(
    <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          width={12}
          placeholder="Question"
          name="question"
          value={question}
          onChange={this.handleChange}
        />
      <Form.Group>
        <Form.Input
          width={10}
          placeholder="Enter an answer"
          name="choiceOneA"
          value={choiceOneA}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          label="Answer ?"
          name="choiceOneC"
          value={choiceOneC}
          onClick={this.handleClick}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          width={10}
          placeholder="Enter an answer"
          name="choiceTwoA"
          value={choiceTwoA}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          label="Answer ?"
          name="choiceTwoC"
          value={choiceTwoC}
          onClick={this.handleClick}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          width={10}
          placeholder="Enter an answer"
          name="choiceThreeA"
          value={choiceThreeA}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          label="Answer ?"
          name="choiceThreeC"
          value={choiceThreeC}
          onClick={this.handleClick}
        />
      </Form.Group>

      <Button inverted>Submit</Button>
    </form>
    
    )
  }
  }

export default MultiForm;
