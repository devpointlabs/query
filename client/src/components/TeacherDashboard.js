import React from "react";
import ActiveCard from "./ActiveQuizCard";
import { Button, Form, Header, Card, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class TeacherDashboard extends React.Component {
  state = {
    name: "",
    info: "New Quiz",
    q_id: {},
    qActive: [],
    redirect: false,
    quizzes: [],
    toggle: false
  };

  dater = a => {
    let b = Date(a);
    let c = b
      .split(" ")
      .splice(1, 3)
      .join(" ");
    return c;
  };

  nowDate() {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    return month[mm] + " " + dd + " " + yyyy;
  }

  setRedirect = theChoosenOne => {
    this.setState({
      redirect: true,
      q_id: theChoosenOne
    });
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
      let clock = `Time Remaining [${min}:${sec}]  `;
      if (timer <= 0) {
        axios
          .patch(`/api/quizzes/${this.props.id}`, { end: "", active: false })
          .then(res => {
            this.setState({
              lenght: null,
              active: res.data.active,
              end: res.data.end
            });
          });
      }
      this.setState({ clock: clock });
    }
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      const quiz = this.state.q_id;
      return <Redirect quiz={quiz} to={`/quizbuilder/${quiz.id}`} />;
    }
  };

  componentDidMount() {
    axios.get("/api/quizzes").then(res => {
      res.data.map(q => {
        if (q.active) {
          this.setState({ qActive: [q, ...this.state.qActive] });
        } else {
          this.setState({ quizzes: [q, ...this.state.quizzes] });
        }
      });
    });
  }

  shuffle = () => {
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
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const newQuiz = this.state;
    axios.post("/api/quizzes", newQuiz).then(res => {
      this.setState({
        name: "",
        info: "New Quiz",
        quizzes: [res.data, ...this.state.quizzes]
      });
    });
  };

  render() {
    const { qActive } = this.state;
    console.log(qActive);
    return (
      <div>
        {qActive.length !== 0 ? (
          <div>
            <Header
              as="h3"
              style={{ textAlign: "center", color: "#6D55A3" }}
              inverted
            >
              Active Quizzes
            </Header>
            <Card.Group centered>
              {this.state.qActive.map(quiz => (
                <ActiveCard
                  quiz={quiz}
                  key={quiz.id}
                  shuffle={() => this.shuffle()}
                />
              ))}
            </Card.Group>
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                width: "100%",
                height: "5px",
                margin: "25px"
              }}
            />
          </div>
        ) : null}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card.Group centered>
            <Card color="violet">
              <Card.Meta style={{ marginTop: "13px", marginLeft: "15px" }}>
                {" "}
                {this.nowDate()}{" "}
              </Card.Meta>
              <Form size="tini" onSubmit={this.handleSubmit}>
                <Form.Input
                  style={{ marginTop: "0px", marginBottom: "0px" }}
                  placeholder="New Quiz Name"
                  autofocus
                  name="name"
                  value={this.state.name}
                  required
                  onChange={this.handleChange}
                />
              </Form>
              <Button
                style={{ marginTop: "0px" }}
                size="mini"
                onClick={() => this.handleSubmit()}
              >
                Create New Quiz
              </Button>
            </Card>
            {this.state.quizzes.map(quiz => (
              <Card
                color="violet"
                key={quiz.id}
                link
                onClick={() => this.setRedirect(quiz)}
              >
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
      </div>
    );
  }
}
export default TeacherDashboard;
