import React from 'react';
import axios from 'axios';
import { Button, Header, } from 'semantic-ui-react';
import MultiForm from './MultiForm';
import OpenAnswerForm from './OpenAnswerForm';
import TrueFalse from './TrueFalse';

class ShowQuiz extends React.Component {
  state = { quiz: {}, questions: [], showMultiForm: false, showTrueFalseForm: false, showOpenForm: false, showButtons: true }

  componentDidMount() {
    axios.get(`/api/quizzes/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ quiz: res.data, })
      })
    axios.get(`/api/quizzes/${this.props.match.params.id}/questions`)
      .then( res => {
        this.setState({ questions: res.data})
      })
  }

  toggleMultiForm = () => this.setState({ showMultiForm: !this.state.showMultiForm, showButtons: false })
  toggleTFForm = () => this.setState({ showTrueFalseForm: !this.state.showTrueFalseForm, showButtons: false })
  toggleOpenForm = () => this.setState({ showOpenForm: !this.state.showOpenForm, showButtons: false })
  toggleButtons = () => this.setState({ showButtons: true, showMultiForm: false, showTrueFalseForm: false, showOpenForm: false })


  render() {
    document.body.style = 'background: #6D55A3;'
    const { quiz, } = this.state;
    return (
      <div>
        <Header as="h1" inverted>{quiz.name}</Header>
        <ol>
          {this.state.questions.map( q => (
            <li key={q.id}>{q.name}</li>
          ))}
        </ol>
        <p style={{color: "white"}}>Add Question:</p>
        { this.state.showButtons ? 
        <>
          <Button.Group>
            <Button onClick={this.toggleMultiForm}>Multiple Choice</Button>
            <Button onClick={this.toggleTFForm}>True or False</Button>
            <Button onClick={this.toggleOpenForm}>Open</Button>
          </Button.Group>
        </>
        :
        null}
        <div>
          {this.state.showMultiForm && <MultiForm quiz_id={quiz.id}/> }
          {this.state.showTrueFalseForm && <TrueFalse quiz_id={quiz.id}/> }
          {this.state.showOpenForm && <OpenAnswerForm quiz_id={quiz.id}/> }
          {this.state.showButtons ? null : <Button onClick={this.toggleButtons}>Cancel</Button>}
        </div>
      </div>
    )
  }
}
export default ShowQuiz;