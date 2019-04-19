import React from "react";
import axios from "axios";
import Timer from "./Timer";
import { Grid, Form, Button, Icon } from "semantic-ui-react";
import { AuthConsumer } from "../providers/AuthProvider";
import styled from "styled-components";
import Navbar from "./Navbar";
import MC from "../quiz_components/MC";
import Open from "../quiz_components/Open";
import TorF from "../quiz_components/TorF";
import styles from "../styles/styles.css";
import {Link,} from 'react-router-dom'

class TakeQuiz extends React.Component {
  state = {
    quiz: {},
    questions: [],
    choices: [],
    questionsIds: [],
    student_answer: [],
    press: false,
    sub_id: "",
    clock: null,
    end: null,
    interval: null,
    active: null
  };

  componentDidMount() {
    this.setState({ interval: setInterval(this.timer, 1000) });
    const quiz_id = this.props.match.params.id;
    axios.get(`/api/quizzes/${quiz_id}`).then(res => {
      this.setState({
        quiz: res.data,
        end: res.data.end,
        active: res.data.active
      });
    });
    axios.get(`/api/quizzes/${quiz_id}/questions`).then(res1 => {
      for (let ques of res1.data) {
        let ques_id = ques.id;
        axios.get(`/api/questions/${ques_id}/choices`).then(res => {
          this.setState({
            questions: [{ ...ques, choices: res.data }, ...this.state.questions]
          });
        });
      }
    });
    axios.get(`/api/submissions`).then(res => {
      res.data.map(sub => {
        if (quiz_id == sub.quiz_id) this.setState({ sub_id: sub.id });
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ press: true });
    axios.patch("/api/submit_quiz", {sub_id: this.state.sub_id})
  };

  timer = () => {
    if (this.state.end !== "") {
      let time = ("" + Date.now()).split("");
      time.splice(0, time.count - 13);
      time = parseInt(time.join(""));
      let timer = parseInt(this.state.end) - time;
      let min = Math.floor((timer / 1000 / 60) << 0);
      let sec = Math.floor((timer / 1000) % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      let clock = `[${min}:${sec}]`;
      if (timer <= 0 && this.state.end !== "") {
        axios
          .patch(`/api/quizzes/${this.props.match.params.id}`, {
            end: "",
            active: false
          })
          .then(res => {
            this.setState({
              end: res.data.end,
              active: res.data.end
            });
          });
      }
      this.setState({ clock: clock });
    }
  };

  clock = () => {
    const { end, active } = this.state;
    if (end !== "" && active) {
      return this.state.clock;
    } else if (end === "" && active) {
      return "The Creater Of This Query Will Decide When To End It";
    } else {
      return "The Time For This Query Has Passed";
    }
  };

  addStudentAnswer = (student_answer, choice_id) => {
    // retrieves state from MC, Open, and TorF components and posts them to the data base.
    const id = this.state.sub_id;
    const answer = {
      submission_id: id,
      student_answer: student_answer,
      choice_id: choice_id
    };
    axios.post(`/api/submissions/${id}/submission_choices`, answer);
  };

  render() {
    const quiz_name = this.state.quiz.name;
    const quiz_info = this.state.quiz.info;
    const quiz_id = this.state.quiz.id;
    const anon = this.state.quiz.anon;
    document.body.style = "background: #fff";

    return (
      <Grid divided="vertically">
        <DescContainer>
          <div style={{ marginTop: "25px" }}>
            <Navbar />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "20px",
              marginTop: "125px"
            }}
          >
            <div style={{}}>

            <HeaderText fSize="small">{quiz_name}</HeaderText>
            <HeaderText>{quiz_info}</HeaderText>
            </div>
            <div>

            <hr
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                width: "100%",
                height: "1px"
              }}
              />
              </div>

            {/* Switches quiz description depending wether it is a anonymous or identified quiz */}
            {anon ? (
              <HeaderText fSize="small">
                Submission is <strong>Anonymous</strong>
              </HeaderText>
            ) : (
              <HeaderText fSize="small">
                Submission is <strong>Identified</strong>
              </HeaderText>
            )}
            {anon ? (
              <HeaderText fSize="tiny">
                The creator of this query won't know who you are.
              </HeaderText>
            ) : (
              <HeaderText fSize="tiny">
                The creator of this query will know who you are.
              </HeaderText>
            )}
            <HeaderText fSize="tiny">Time Remaining:</HeaderText>
            <HeaderText fSize="tiny">{this.clock()}</HeaderText>
          </div>
        </DescContainer>
        <QuesContainer>
          {/* Depending on the question type it will render a component that formats the question */}
          <form action="#" onSubmit={this.handleSubmit}>
            {this.state.questions.map(question => {
              if (question.qType === "MC") {
                return (
                  <MC
                    key={question.id}
                    press={this.state.press}
                    question={question.name}
                    addStudentAnswer={this.addStudentAnswer}
                    choices={question.choices}
                    quiz_id={quiz_id}
                  />
                );
              } else if (question.qType === "open") {
                return (
                  <Open
                    key={question.id}
                    press={this.state.press}
                    question={question.name}
                    addStudentAnswer={this.addStudentAnswer}
                    quiz_id={quiz_id}
                    choices={question.choices}
                  />
                );
              } else if (question.qType === "TorF") {
                return (
                  <TorF
                    key={question.id}
                    press={this.state.press}
                    question={question.name}
                    addStudentAnswer={this.addStudentAnswer}
                    choices={question.choices}
                    quiz_id={quiz_id}
                  />
                );
              }
            })}
            <Button
              inverted
              icon
              style={{ position: "fixed", right: "20px", bottom: "20px", borderRadius: "50%", }}
              as={Link} to={{pathname: "/graded", state: { sub_id: this.state.sub_id, quiz_id: quiz_id}}}

            >
              <div style={{backgroundColor: "#5906a3", width: "6rem", height: "6rem", borderRadius: "100%"}}>
                <span>
                  <i style={{marginTop: "16px"}} class="fab fa-telegram-plane fa-4x" />
                </span>
              </div>
            </Button>
          </form>
        </QuesContainer>
      </Grid>
    );
  }
}

// Styled Components

const SubmitButton = styled.input`
  background-color: #5906a3;
  color: white;
  border: none;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: block;
  height: 82px;
  width: 82px;
  border-radius: 50%;
`;

const DescContainer = styled.div`
  background: #5906a3;
  height: 120vh;
  width: 40%;
  position: fixed;
`;

const QuesContainer = styled.div`
  height: 100vh;
  width: 60%;
  margin-top: 100px;
  position: absolute;
  right: 0;
  top: 0;
`;

const HeaderText = styled.h1`
  color: white !important;
  font-family: menlo;
  font-size: ${props => fontSize(props.fSize)} !important;
`;
const fontSize = size => {
  switch (size) {
    case "large":
      return "4rem";
    case "medium":
      return "2rem";
    case "small":
      return "1.5rem";
    case "tiny":
      return ".75rem";
    default:
      return "1rem";
  }
};


const StyledIcon = styled.div`
  color: #5906a3 !important;
`;

const QuizList = styled.ul``;

export default TakeQuiz;

{
  /* <Icon
  className="icon"
  circular
  inverted
  name="telegram plane"
  size="big"
  color="purple"
  basic
/> */
}
