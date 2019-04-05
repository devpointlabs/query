import React from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';

class Question extends React.Component {
  state = { choices: [], correctChoice: ""}
  componentDidMount() {
    axios.get(`/api/questions/${this.props.id}/choices`)
      .then( res => (
        this.setState({ choices: res.data, })
      ))
  }

  
  // correctAnswer = () => {
  //   const {choices} = this.state
  //   const c =  choices.filter(choice => choice.correctAnswer === true)  
  // }

  quizTypeName = ( qType ) => {
    switch (qType) {
      case 'TorF':
        return "True or False"
      case 'MC':
        return "Multiple Choice"
      case 'open':
        return "Open Answer"
      default:
        return null
    }
  }

  renderChoices = (choices) => {
    const c = choices.map( choice => choice.correct_answer)
    debugger
    return c 
  }


  render() {
    const { name, qType, explanation } = this.props
    const { choices, } =  this.state;
    return (
      <>        
        <Card fluid>
          <Card.Content header={this.quizTypeName(qType)}/>
            <Card.Content description={name} />
            <Card.Content extra>
            <b>correct answer: {this.state.correctChoice}</b>
            <br />
            Explanation: {explanation}
          </Card.Content>
          <Button.Group>
            <Button inverted color="purple">Edit</Button>
            <Button inverted onClick={() => this.props.remove(this.props.id)} color="purple" >Delete</Button>
          </Button.Group>
        </Card>
        {/* <ul>
          {choices.map( c => (
            <li key={c.id}>{c.answer}</li>
            ))}
            <li>{name} : {qType} : correct response : {explanation}</li>
        </ul> */}
      </>
    )
  }
}
export default Question