import React from 'react';
import axios from 'axios';
import { Card, Button, } from 'semantic-ui-react';

class Question extends React.Component {
  state = {choices: []};
  componentDidMount() {
<<<<<<< HEAD
    axios
      .get(`/api/questions/${this.props.id}/choices`)
      .then(res => this.setState({choices: res.data}));
=======
    axios.get(`/api/questions/${this.props.id}/choices`)
      .then( res => (
        this.setState({ choices: res.data, })
      ))
  }

  
  correctAnswer = () => {
    const {choices} = this.state
    return choices.filter(choice => choice.correctAnswer === true)    
>>>>>>> 0a82f082fb7621fdfd32771f0606ba35fc81533d
  }

  quizTypeName = qType => {
    switch (qType) {
      case 'TorF':
        return 'True or False';
      case 'MC':
        return 'Multiple Choice';
      case 'open':
        return 'Open Answer';
      default:
        return null;
    }
  };

  render() {
    const {name, qType, explanation} = this.props;
    const renderChoices = this.state.choices.map(c => {
      if (c.correct_answer) {
        return (
          <div key={c.id}>
            <h3 style={{display: 'inline'}}>{c.answer}</h3>
            <h4 style={{display: 'inline' ,color: 'green'}}> &lt;= Correct Answer</h4>
          </div>
        );
      } else {
        return (
          <div key={c.id}>
            <h4>{c.answer}</h4>
          </div>
        );
      }
    });

    return (
      <>
        <Card fluid>
          <Card.Content header={this.quizTypeName(qType)} />
          <Card.Content description={name} />
          <Card.Content extra>
            <b>{renderChoices}</b>
            <br />
            Explanation: {explanation}
          </Card.Content>
          <Button.Group>
<<<<<<< HEAD
            <Button inverted color="purple">
              Edit
            </Button>
            <Button inverted color="purple">
              Delete
            </Button>
=======
            <Button inverted color="purple">Edit</Button>
            <Button inverted onClick={() => this.props.remove(this.props.id)} color="purple" >Delete</Button>
>>>>>>> 0a82f082fb7621fdfd32771f0606ba35fc81533d
          </Button.Group>
        </Card>
      </>
    );
  }
}
export default Question;
