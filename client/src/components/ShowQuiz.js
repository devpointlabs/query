import React from "react";
import axios from "axios";
import { Button, Header, Container, List } from "semantic-ui-react";
import MultiForm from "./MultiForm";
import OpenAnswerForm from "./OpenAnswerForm";
import TrueFalse from "./TrueFalse";
import Question from "./Question";

class ShowQuiz extends React.Component {
  state = {
    quiz: {},
    questions: [],
    choices: [],
    showMultiForm: false,
    showTrueFalseForm: false,
    showOpenForm: false,
    showButtons: true
  };

  componentDidMount() {
    axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
      this.setState({ quiz: res.data });
    });
    axios
      .get(`/api/quizzes/${this.props.match.params.id}/questions`)
      .then(res => {
        this.setState({ questions: res.data });
      });
  }

  removeQuestion = (id) => {
    axios.delete(`/api/quizzes/${this.props.match.params.id}/questions/${id}`)
      .then( res => {
        const { questions, } = this.state;
        this.setState({ questions: questions.filter(r => r.id !== id), })
      })
  }

  addQuestion = (question) => {
    this.setState({ questions: [...this.state.questions, question] });
  };

  addChoice = (choice) => {
    this.setState({ choices: [...this.state.choices, choice] });
    debugger
  };

  toggleMultiForm = () =>
    this.setState({
      showMultiForm: !this.state.showMultiForm,
      showButtons: false
    });
  toggleTFForm = () =>
    this.setState({
      showTrueFalseForm: !this.state.showTrueFalseForm,
      showButtons: false
    });
  toggleOpenForm = () =>
    this.setState({
      showOpenForm: !this.state.showOpenForm,
      showButtons: false
    });
  toggleButtons = () =>
    this.setState({
      showButtons: true,
      showMultiForm: false,
      showTrueFalseForm: false,
      showOpenForm: false
    });

  render() {
    document.body.style = "background: #6D55A3;";
    const { quiz, questions } = this.state;
    return (
      <Container>
        <Header as="h1" inverted>
          {quiz.name}
        </Header>
        <List>
          {this.state.questions.map(q => (
            <Question remove={() => this.removeQuestion()} key={q.id} {...q} />
          ))}
        </List>
        <p style={{ color: "white" }}>Add Question:</p>
        {this.state.showButtons ? (
          <>
            <Button.Group>
              <Button inverted onClick={this.toggleMultiForm}>
                Multiple Choice
              </Button>
              <Button inverted onClick={this.toggleTFForm}>
                True or False
              </Button>
              <Button inverted onClick={this.toggleOpenForm}>
                Open
              </Button>
            </Button.Group>
          </>
        ) : null}
        <div>
          {this.state.showMultiForm && <MultiForm quiz_id={quiz.id} />}
          {this.state.showTrueFalseForm && (
            <TrueFalse quiz_id={quiz.id} addQuestion={this.addQuestion} addChoice={this.addChoice} />
          )}
          {this.state.showOpenForm && (
            <OpenAnswerForm quiz_id={quiz.id} addQuestion={this.addQuestion}  />
          )}
          {this.state.showButtons ? null : (
            <Button onClick={this.toggleButtons}>Cancel</Button>
          )}
        </div>
      </Container>
    );
  }
}
export default ShowQuiz;
