import React from "react";
import ActiveCard from "./ActiveQuizCard";
import { Card, Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class StudentDashboard extends React.Component {
  state = {
    name: "",
    q_id: {},
    qActive: [],
    redirect: false,
    quizzes: [],
    toggle: false,
    submissions: [],
    submission: {},
    width: 0
  };

  dater = a => {
    let b = new Date(a);
    let c = b
      .toString()
      .split(" ")
      .splice(1, 3)
      .join(" ");
    return c;
  };

  setRedirect = theChoosenOne => {
    this.setState({
      redirect: true,
      q_id: theChoosenOne,
      submission: this.state.submissions.filter(
        s => s.quiz_id === theChoosenOne.id
      )[0]
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      if (!this.state.submission.complete) {
        const quiz = this.state.q_id;
        if (quiz.active) {
          return (
            <Redirect
              to={{
                pathname: "/graded",
                state: {
                  sub_id: this.state.submission.id,
                  quiz_id: this.state.q_id.id
                }
              }}
            />
          );
        } else {
          return <Redirect to="/QuizTimeOut" />;
        }
      } else {
        return (
          <Redirect
            to={{
              pathname: "/graded",
              state: {
                sub_id: this.state.submission.id,
                quiz_id: this.state.q_id.id
              }
            }}
          />
        );
      }
    }
  };

  componentDidMount() {
    axios.get("/api/studsub").then(res => {
      res.data.map(q => {
        if (q.going) {
          this.setState({ qActive: [q, ...this.state.qActive] });
        } else {
          this.setState({ quizzes: [q, ...this.state.quizzes] });
        }
      });
    });
    axios
      .get("/api/submissions")
      .then(res => this.setState({ submissions: res.data }));
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  shuffle = id => {
    axios.patch(`/api/stop/${id}`, { end: "", active: false }).then(nub => {
      this.setState({ qActive: [], quizzes: [] });
      axios.get("/api/quizzes").then(res => {
        res.data.map(q => {
          if (q.active) {
            this.setState({ qActive: [q, ...this.state.qActive] });
          } else {
            this.setState({ quizzes: [q, ...this.state.quizzes] });
          }
        });
      });
    });
  };

  render() {
    const { qActive, width } = this.state;
    return (
      <Container>
        {qActive.length !== 0 ? (
          <div>
            <Card.Group centered>
              {this.state.qActive.map(quiz => (
                <ActiveCard
                  quiz={quiz}
                  key={quiz.id}
                  shuffle={this.shuffle}
                  submission={
                    this.state.submissions.filter(s => s.quiz_id === quiz.id)[0]
                  }
                />
              ))}
            </Card.Group>
          </div>
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white"
            }}
          >
            You currently have no active queries
          </h1>
        )}
        <div
          style={
            width < 500
              ? {
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  width: "auto",
                  height: "5px",
                  margin: "25px"
                }
              : {
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  width: "100%",
                  height: "5px",
                  margin: "25px"
                }
          }
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card.Group centered>
            {this.state.quizzes.map(quiz => (
              <Card key={quiz.id} link onClick={() => this.setRedirect(quiz)}>
                <Card.Content>
                  <Card.Meta> {this.dater(quiz.created_at)} </Card.Meta>
                  <Card.Header style={{ marginTop: "7px" }}>
                    {quiz.name}
                  </Card.Header>
                  <Card.Description>{quiz.info}</Card.Description>
                </Card.Content>
                {this.renderRedirect()}
              </Card>
            ))}
          </Card.Group>
        </div>
      </Container>
    );
  }
}
export default StudentDashboard;
