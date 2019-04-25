import React from "react";
import axios from "axios";
import { Grid, Button } from "semantic-ui-react";
import styled from "styled-components";
import Navbar from "./Navbar";
import MC from "../quiz_components/MC";
import Open from "../quiz_components/Open";
import TorF from "../quiz_components/TorF";
import { Redirect } from "react-router-dom";
import styles from "../styles/styles.css";

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
    active: null,
    toogle: false,
    width: 0,
    height: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
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
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.patch("/api/submit_quiz", { sub_id: this.state.sub_id });
    this.setState({ press: true });
  };

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ press: true });
    axios.patch("/api/submit_quiz", { sub_id: this.state.sub_id });
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
    axios
      .post(`/api/submissions/${id}/submission_choices`, answer)
      .then(this.setState({ toogle: true }));
  };

  render() {
    const quiz_info = this.state.quiz.info;
    const quiz_id = this.state.quiz.id;
    const anon = this.state.quiz.anon;
    const sub_id = this.state.sub_id;
    document.body.style = "background: #fff";
    if (this.state.toogle)
      return (
        <Redirect
          to={{
            pathname: "/graded",
            state: { sub_id: sub_id, quiz_id: quiz_id }
          }}
        />
      );
    else {
      if (this.state.width <= 620) {
        return (
          <Grid>
            <MobileDescContainer>
              <div style={{ marginTop: "20px" }}>
                <Navbar />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  margin: "20px",
                  marginTop: "60px"
                }}
              >
                <div>
                  <HeaderText fSize="small">{this.state.quiz.name}</HeaderText>
                  <StyledP style={{ marginBottom: "15px" }}>
                    {quiz_info}
                  </StyledP>
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
                  <StyledP style={{ marginTop: "15px" }}>
                    Submission is <strong>Anonymous</strong>
                  </StyledP>
                ) : (
                  <StyledP style={{ marginTop: "15px" }}>
                    Submission is <strong>Identified</strong>
                  </StyledP>
                )}
                {anon ? (
                  <StyledI>
                    The creator of this query won't know who you are.
                  </StyledI>
                ) : (
                  <StyledI>
                    The creator of this query will know who you are.
                  </StyledI>
                )}
                <StyledP style={{ marginTop: "30px" }}>Time Remaining:</StyledP>
                <StyledP style={{ size: ".5rem" }}>{this.clock()}</StyledP>
              </div>
            </MobileDescContainer>
            <MobileQuesContainer>
              {/* Depending on the question type it will render a component that formats the question */}
              <form
                style={{
                  display: "flex",
                  justifyContent: "content",
                  flexDirection: "column"
                }}
                action="#"
                onSubmit={this.handleSubmit}
              >
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
                  style={{
                    borderRadius: "50%"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#5906a3",
                      width: "6rem",
                      height: "6rem",
                      borderRadius: "100%"
                    }}
                  >
                    <span>
                      <i
                        style={{ marginTop: "16px" }}
                        className="fab fa-telegram-plane fa-4x"
                      />
                    </span>
                  </div>
                </Button>
              </form>
            </MobileQuesContainer>
          </Grid>
        );
      } else {
        return (
          <Grid divided="vertically">
            <DescContainer>
              <div style={{ marginTop: "20px" }}>
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
                  <HeaderText fSize="small">{this.state.quiz.name}</HeaderText>
                  <StyledP style={{ marginBottom: "15px" }}>
                    {quiz_info}
                  </StyledP>
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
                  <StyledP style={{ marginTop: "15px" }}>
                    Submission is <strong>Anonymous</strong>
                  </StyledP>
                ) : (
                  <StyledP style={{ marginTop: "15px" }}>
                    Submission is <strong>Identified</strong>
                  </StyledP>
                )}
                {anon ? (
                  <StyledI>
                    The creator of this query won't know who you are.
                  </StyledI>
                ) : (
                  <StyledI>
                    The creator of this query will know who you are.
                  </StyledI>
                )}
                <StyledP style={{ marginTop: "30px" }}>Time Remaining:</StyledP>
                <StyledP style={{ size: ".5rem" }}>{this.clock()}</StyledP>
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
                  style={{
                    position: "fixed",
                    right: "20px",
                    bottom: "20px",
                    borderRadius: "50%"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#5906a3",
                      width: "6rem",
                      height: "6rem",
                      borderRadius: "100%"
                    }}
                  >
                    <span>
                      <i
                        style={{ marginTop: "16px" }}
                        className="fab fa-telegram-plane fa-4x"
                      />
                    </span>
                  </div>
                </Button>
              </form>
            </QuesContainer>
          </Grid>
        );
      }
    }
  }
}

const StyledP = styled.p`
  color: white;
`;
const StyledI = styled.i`
  color: white;
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

const MobileDescContainer = styled.div`
  background: #5906a3;
  width: 100%;
`;

const MobileQuesContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TakeQuiz;
