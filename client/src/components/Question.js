import React from 'react';
import axios from 'axios';
import {Card, Button} from 'semantic-ui-react';
import EditQuestion from './EditQuestion'

class Question extends React.Component {
  state = {choices: [], showForm: false,};

  componentDidMount() {
    axios
      .get(`/api/questions/${this.props.id}/choices`)
      .then(res => this.setState({choices: res.data}));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showForm !== prevState.showForm) {
      axios
      .get(`/api/questions/${this.props.id}/choices`)
      .then(res => this.setState({choices: res.data}));
      this.props.toggleEdited();
    }
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

  // toggleEdited = () => this.setState({edited: !this.state.edited})

  toggleForm = () => this.setState({ showForm: !this.state.showForm})

  render() {
    const {name, qType, explanation} = this.props;
    const renderChoices = this.state.choices.map(c => {
      if (c.correct_answer) {
        return (
          <div key={c.id}>
            <h3 style={{display: 'inline'}}>{c.answer}</h3>
            <h4 style={{display: 'inline', color: 'green'}}>
              {' '}
              &lt;= Correct Answer
            </h4>
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

    const { showForm, } = this.state;
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
            <Button inverted color="purple" onClick={this.toggleForm}>
              Edit
            </Button>
            <Button
              inverted
              onClick={() => this.props.remove(this.props.id)}
              color="purple">
              Delete
            </Button>
          </Button.Group>
        </Card>
        { showForm && 
          <EditQuestion 
            qType={qType}
            name={name} 
            explanation={explanation}   
            choices={this.state.choices} 
            quiz_id={this.props.quiz_id} 
            question_id={this.props.question_id}
            toggleForm={this.toggleForm}
            // toggleEdited={this.toggleEdited}
          />}
      </>
    );
  }
}
export default Question;
