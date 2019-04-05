import React from 'react';
import axios from 'axios';
import { Card, Button, } from 'semantic-ui-react';

class Question extends React.Component {
  state = {choices: []};
  componentDidMount() {
    axios
      .get(`/api/questions/${this.props.id}/choices`)
      .then(res => this.setState({choices: res.data}));
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
          <div style={{color: 'green'}} key={c.id}>
            <h3>{c.answer}</h3>
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
            <Button inverted color="purple">
              Edit
            </Button>
            <Button inverted color="purple">
              Delete
            </Button>
          </Button.Group>
        </Card>
      </>
    );
  }
}
export default Question;
