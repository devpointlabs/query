import React from 'react';
import axios from 'axios';
import Timer from './Timer'
import { Button, Header, Container, List } from 'semantic-ui-react';
import MultiForm from './MultiForm';
import OpenAnswerForm from './OpenAnswerForm';
import TrueFalse from './TrueFalse';
import Question from "./Question";
import EditQuiz from './EditQuiz';

class ShowQuiz extends React.Component {
  state = {
    quiz: {},
    questions: [],
    choices: [],
    showMultiForm: false,
    showTrueFalseForm: false,
    showOpenForm: false,
    showButtons: true,
    edited: false,
    showEditQuiz: false,

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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.edited !== prevState.edited){
      axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
        this.setState({ quiz: res.data });
      });
      axios
        .get(`/api/quizzes/${this.props.match.params.id}/questions`)
        .then(res => {
          this.setState({ questions: res.data });
        });
    }
  }

  toggleEdited = () => this.setState({ edited: !this.state.edited, })
 

  removeQuestion = (id) => {
    axios.delete(`/api/quizzes/${this.props.match.params.id}/questions/${id}`)
      .then(res => {
        const { questions, } = this.state;
        this.setState({ questions: questions.filter(r => r.id !== id), })
      })
  }

  handleDelete = () => {
    const id = this.state.quiz.id
    axios.delete(`/api/quizzes/${id}`)
      .then(res => {
        this.props.history.push("/home")
  })
  }

  updateQuiz = (q) => {
    this.setState({ quiz: {name: q.name, info: q.info} })
  }

  addQuestion = (question) => {
    this.setState({ questions: [...this.state.questions, question] });
  };

  addChoice = (choice) => {
    this.setState({ choices: [...this.state.choices, choice] });
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
  toggleEditQuiz = () =>
    this.setState({
      showEditQuiz: !this.state.showEditQuiz
    });

  render() {
    document.body.style = "background: #6D55A3;";
    const { quiz, questions } = this.state;
    return (
      <Container>

        {this.state.showEditQuiz ? 
          <EditQuiz quiz={quiz} updateQuiz={this.updateQuiz} toggle={this.toggleEditQuiz} /> 
        :
          <div>
            <Button inverted size="mini" onClick={this.toggleEditQuiz}>
              Edit Title/Description
            </Button>
          </div>
        }
        <Button inverted size="mini" onClick={ () => this.handleDelete()}>
              Delete
        </Button>
        <Header as="h1" inverted>
          {quiz.name}
        </Header>
        <Timer id={this.props.match.params.id} />
        <List>
          {questions.map(q => (
            <Question remove={this.removeQuestion} key={q.id} {...q} quiz_id={this.props.match.params.id} question_id={q.id} toggleEdited={this.toggleEdited} />
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
          {this.state.showMultiForm && <MultiForm quiz_id={quiz.id} addQuestion={this.addQuestion} addChoice={this.addChoice} />}
          {this.state.showTrueFalseForm && (
            <TrueFalse quiz_id={quiz.id} addQuestion={this.addQuestion} addChoice={this.addChoice} />
          )}
          {this.state.showOpenForm && (
            <OpenAnswerForm quiz_id={quiz.id} addQuestion={this.addQuestion} />
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
