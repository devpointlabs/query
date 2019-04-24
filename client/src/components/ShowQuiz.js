import React from "react";
import axios from "axios";
import Timer from "./Timer";
import { Button, List, Form, Input, Icon } from "semantic-ui-react";
import OpenAnswerForm from "./OpenAnswerForm";
import TrueFalse from "./TrueFalse";
import Question from "./Question";
import Navbar from "./Navbar";
import AddStudent from "./AddStudent";
import DynamicMCForm from "./DynamicMCForm";
import SeeResults from './SeeResults';

class ShowQuiz extends React.Component {
  state = {
    quiz: {},
    questions: [],
    choices: [],
    email: [],
    showMultiForm: false,
    showTrueFalseForm: false,
    showOpenForm: false,
    showButtons: true,
    edited: false,
    showEditQuiz: false,
    anon: true,
    go: false,
    width: 0,
    height: 0,
    flashMsgText: "",
    showFlash: false,
    seeResultsLink: false
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
      res.data.email
        ? this.setState({ email: res.data.email.split(","), quiz: res.data, anon: res.data.anon })
        : this.setState({ quiz: res.data, anon: res.data.anon });
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
    }
    if (this.state.go === true) {
      axios
        .get(`/api/quizzes/${this.props.match.params.id}/questions`)
        .then(res => {
          this.setState({ questions: res.data, go: false });
        });
    }
  }

  toggleGo = () => this.setState({ go: !this.state.go });

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  toggleEdited = () => this.setState({ edited: !this.state.edited });

  toggleAnon = () => {
    axios.patch(`/api/quizzes/${this.props.match.params.id}`, {
      anon: !this.state.anon
    }).then(res => {
      this.setState({anon: res.data.anon})
    })
  };

  deleteSt = m => {
    let { email, id } = this.state;
    let arr = email.slice(0);
    let idx = arr.indexOf(m);
    arr.splice(idx, 1);
    axios
      .patch(`/api/quizzes/${this.props.match.params.id}`, {
        email: arr.join()
      })
      .then(res => {
        this.setState({ email: res.data.email.split(",") });
      });
  };

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
    const conf = window.confirm("Are you sure?")
    if (conf === true)
    {axios.delete(`/api/quizzes/${id}`).then(res => {
      this.props.history.push("/home")
    })};
  };

  updateQuiz = q => {
    this.setState({ quiz: { name: q.name, info: q.info } });
    document.location.reload(true);

  };

  addQuestion = (question, open) => {
    if (open) {
      this.setState({ questions: [question, ...this.state.questions] });
    } else {
      axios.get(`/api/questions/${question.data.id}/choices`).then(res => {
        this.setState({
          questions: [
            { ...question.data, choices: [...res.data] },
            ...this.state.questions
          ]
        });
      });
    }
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

  getEmail = f => {
    this.setState({ email: [...f, ...this.state.email] });
    let s = [...f, ...this.state.email].join();
    axios.patch(`/api/quizzes/${this.props.match.params.id}`, {
      email: s
    });
  };

  handleChange = (e, { name, value }) =>
    this.setState({
      showEditQuiz: true,
      quiz: { ...this.state.quiz, [name]: value }
    });

  editQuiz = e => {
    e.preventDefault();
    if (this.state.quiz.name !== "") {
      const id = this.props.match.params.id;
      const quiz = { ...this.state };
      axios.put(`/api/quizzes/${id}`, quiz).then(res => {
        this.updateQuiz(res.data);
      });
      this.setState({ showFlash: false });
      this.toggleEditQuiz();
    } else {
      this.setState({
        flashMsgText: "Choice cannot be empty",
        showFlash: true
      });
    }
  };

  renderFlash = () => {
    return <div style={flashStyle}>{this.state.flashMsgText}</div>;
  };

  seeResults = () => {
    this.setState({ seeResultsLink: true, })
  }

  render() {
    document.body.style = "background: #5906A3;";

    const { quiz } = this.state;
    return (
      <div>
        <Navbar />
        <div
          style={this.state.width < 500 ? divStyle.mobile : divStyle.desktop}
        >
          <div style={{ textAlign: "right" }}>
            <Button
              style={{ color: "#DA0909" }}
              inverted
              size="big"
              onClick={() => this.handleDelete()}
            >
              <Icon name="trash alternate" />
            </Button>
          </div>
          {/* {this.state.showEditQuiz ? 
          <EditQuiz quiz={quiz} updateQuiz={this.updateQuiz} toggle={this.toggleEditQuiz} /> 
          :
          <div>
          <Button size="mini" onClick={this.toggleEditQuiz}>
          Edit Title/Description
          </Button>
          </div>
        } */}
          <Form>
            <Form.Field
              style={{
                paddingTop: "0%",
                marginLeft: "5%",
                marginRight: "40%"
              }}
            >
              <label style={{ color: "#9219FF" }}>Name</label>
              <Input
                style={{ inputStyle }}
                defaultValue={this.state.quiz.name}
                name="name"
                value={quiz.name}
                onChange={this.handleChange}
              />
              {this.state.showFlash && this.renderFlash()}
            </Form.Field>
            <Form.Field style={{ marginLeft: "5%", marginRight: "5%" }}>
              <label style={{ color: "#9219FF" }}>Prompt</label>
              <Form.TextArea
                name="info"
                value={quiz.info}
                onChange={this.handleChange}
              />
            </Form.Field>
            {this.state.showEditQuiz ? (
              <Button style={buttonStyle} onClick={this.editQuiz}>
                Update Quiz
              </Button>
            ) : null}
          </Form>
          <br />

          <Timer
            email={this.state.email}
            id={this.props.match.params.id}
            width={this.state.width}
            seeResults={this.seeResults}
          />
          { this.state.seeResultsLink && <SeeResults quiz_id={quiz.id} /> }
          <div
            style={{
              display: "flex",
              fontSize: "25px",
              marginLeft: "5%",
              marginTop: "2%",
              marginBottom: "2%"
            }}
          >
            <div
              onClick={() => this.toggleAnon()}
              style={
                this.state.anon
                  ? { cursor: "pointer", color: "gray" }
                  : { color: "#9219FF", fontWeight: "bold" }
              }
            >
              Identified
            </div>
            <div style={{ color: "gray", marginLeft: "2%", marginRight: "2%" }}>
              /
            </div>
            <div
              onClick={() => this.toggleAnon()}
              style={
                this.state.anon !== true
                  ? { cursor: "pointer", color: "gray" }
                  : { color: "#9219FF", fontWeight: "bold" }
              }
            >
              Anonymous
            </div>
          </div>
          <header style={{ marginLeft: "5%", color: "gray" }}>
            {" "}
            {this.state.anon
              ? "You will not know what submission belongs to an individual."
              : "You will know what submission belongs to an individual"}
          </header>
          <h1 style={{ marginLeft: "5%" }}>People</h1>
          <AddStudent
            delete={this.deleteSt}
            submail={this.state.email}
            pmail={this.getEmail}
            width={this.state.width}
          />
          <h1 style={{ marginLeft: "5%" }}>Questions</h1>
          <div style={this.state.width < 500 ? { display: "flex" } : null}>
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
          </div>

          <div>
            {/* {this.state.showMultiForm && <MultiForm quiz_id={quiz.id} addQuestion={this.addQuestion} addChoice={this.addChoice} />} */}

            {this.state.showMultiForm && (
              <DynamicMCForm
                quiz_id={quiz.id}
                toggleForm={this.toggleMultiForm}
                addQuestion={this.addQuestion}
                addChoice={this.addChoice}
                toggleButtons={this.toggleButtons}
              />
            )}

            {this.state.showTrueFalseForm && (
              <TrueFalse
                quiz_id={quiz.id}
                addQuestion={this.addQuestion}
                addChoice={this.addChoice}
                toggleButtons={this.toggleButtons}
              />
            )}
            {this.state.showOpenForm && (
              <OpenAnswerForm
                quiz_id={quiz.id}
                addQuestion={this.addQuestion}
                toggleButtons={this.toggleButtons}
              />
            )}
            {this.state.showButtons ? null : (
              <button
                style={{ color: "red", marginLeft: "5%" }}
                onClick={this.toggleButtons}
              >
                Cancel question
              </button>
            )}
          </div>
          <List style={{ marginLeft: "5%", marginRight: "5%" }}>
            {this.state.questions.map(q => (
              <Question
                toggleGo={this.toggleGo}
                remove={this.removeQuestion}
                key={q.id}
                {...q}
                quiz_id={this.props.match.params.id}
                question_id={q.id}
                toggleEdited={this.toggleEdited}
              />
            ))}
          </List>
        </div>
      </div>
    );
  }
}
export default ShowQuiz;

const divStyle = {
  desktop: {
    marginBottom: "50px",
    backgroundColor: "white",
    textAlign: "left",
    color: "#9219FF",
    marginLeft: "15%",
    marginRight: "15%",
    borderRadius: "10px",
    paddingBottom: "2%"
  },
  mobile: {
    marginBottom: "50px",
    backgroundColor: "white",
    textAlign: "left",
    color: "purple",
    borderRadius: "10px",
    paddingBottom: "2%"
  }
};

const buttonStyle = {
  backgroundColor: "white",
  marginLeft: "5%",
  marginRight: "2%",
  border: "1px solid",
  color: "#9219FF"
};

const inputStyle = {
  color: "#9219FF"
};

const flashStyle = {
  backgroundColor: "#FEEFB3",
  color: "#9F6000",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "5px",
  marginBottom: "10px"
};
