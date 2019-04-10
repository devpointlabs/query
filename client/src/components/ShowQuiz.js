import React from "react";
import axios from "axios";
import Timer from "./Timer";
import {
  Button,
  Header,
  Container,
  List,
  Form,
  Input
} from "semantic-ui-react";
import MultiForm from "./MultiForm";
import OpenAnswerForm from "./OpenAnswerForm";
import TrueFalse from "./TrueFalse";
import Question from "./Question";
import EditQuiz from "./EditQuiz";

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
    anon: true
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
    if (this.state.edited !== prevState.edited) {
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

  toggleEdited = () => this.setState({ edited: !this.state.edited });

  removeQuestion = id => {
    axios
      .delete(`/api/quizzes/${this.props.match.params.id}/questions/${id}`)
      .then(res => {
        const { questions } = this.state;
        this.setState({ questions: questions.filter(r => r.id !== id) });
      });
  };

  handleDelete = () => {
    const id = this.state.quiz.id;
    axios.delete(`/api/quizzes/${id}`).then(res => {
      this.props.history.push("/home");
    });
  };

  updateQuiz = q => {
    this.setState({ quiz: { name: q.name, info: q.info } });
  };

  addQuestion = question => {
    this.setState({ questions: [...this.state.questions, question] });
  };

  addChoice = choice => {
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
    const { quiz } = this.state;
    return (
      <div style={divStyle}>
        {/* {this.state.showEditQuiz ? 
          <EditQuiz quiz={quiz} updateQuiz={this.updateQuiz} toggle={this.toggleEditQuiz} /> 
          :
          <div>
          <Button size="mini" onClick={this.toggleEditQuiz}>
          Edit Title/Description
          </Button>
          </div>
        }
        <Button size="mini" onClick={ () => this.handleDelete()}>
        Delete
      </Button> */}
        <Form>
          <Form.Field
            style={{
              paddingTop: "5%",
              marginLeft: "5%",
              marginRight: "40%"
            }}
          >
            <label style={{ color: "purple" }}>Name</label>
            <Input style={{ inputStyle }} defaultValue={this.state.quiz.name} />
          </Form.Field>
          <Form.Field style={{ marginLeft: "5%", marginRight: "5%" }}>
            <label style={{ color: "purple" }}>Prompt</label>
            <input style={{ padding: "7%" }} />
          </Form.Field>
        </Form>
        <br />
        <Timer id={this.props.match.params.id} />
        <div style={{display: 'flex', fontSize: '25px', marginLeft: '5%', marginTop: '2%', marginBottom: '2%' }}>

        <div onClick={() => this.setState({anon: false})} style={this.state.anon ? { color: "gray",  } : { color: "purple", fontWeight: 'bold'}}>
          Identified
        </div>
        <div style={{color: 'gray', marginLeft: '2%', marginRight: '2%'}}>/</div>
        <div onClick={() => this.setState({anon: true})} style={this.state.anon !== true ? { color: "gray",  } : { color: "purple", fontWeight: 'bold' }}>
          Anonymous
        </div>
        </div>
        <header style={{ marginLeft: "5%", color: 'gray' }}> {
         this.state.anon ?  'You will not know what submission belongs to an individual.' : 'You will know what submission belongs to an individual'
        }</header>
        <h1 style={{ marginLeft: "5%" }}>People</h1>
        <h1 style={{ marginLeft: "5%" }}>Questions</h1>
        {this.state.showButtons ? (
          <>
            <Button style={buttonStyle} onClick={this.toggleMultiForm}>
              Multiple Choice
            </Button>
            <Button style={buttonStyle} onClick={this.toggleTFForm}>
              True or False
            </Button>
            <Button style={buttonStyle} onClick={this.toggleOpenForm}>
              Open
            </Button>
          </>
        ) : null}

        <List style={{ marginLeft: "5%", marginRight: "5%" }}>
          {this.state.questions.map(q => (
            <Question
              remove={this.removeQuestion}
              key={q.id}
              {...q}
              quiz_id={this.props.match.params.id}
              question_id={q.id}
              toggleEdited={this.toggleEdited}
            />
          ))}
        </List>
        <div>
          {this.state.showMultiForm && (
            <MultiForm
              quiz_id={quiz.id}
              addQuestion={this.addQuestion}
              addChoice={this.addChoice}
            />
          )}
          {this.state.showTrueFalseForm && (
            <TrueFalse
              quiz_id={quiz.id}
              addQuestion={this.addQuestion}
              addChoice={this.addChoice}
            />
          )}
          {this.state.showOpenForm && (
            <OpenAnswerForm quiz_id={quiz.id} addQuestion={this.addQuestion} />
          )}
          {this.state.showButtons ? null : (
            <Button onClick={this.toggleButtons}>Cancel</Button>
          )}
        </div>
      </div>
    );
  }
}
export default ShowQuiz;

const divStyle = {
  marginBottom: "50px",
  backgroundColor: "white",
  textAlign: "left",
  color: "purple",
  marginLeft: "15%",
  marginRight: "15%",
  borderRadius: "10px",
  paddingBottom: "2%"
};

const buttonStyle = {
  backgroundColor: "white",
  marginLeft: "5%",
  marginRight: "2%",
  border: "1px solid",
  color: "purple"
};

const inputStyle = {
  color: "purple"
};

