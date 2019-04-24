import React from "react";
import ActiveCard from "./ActiveQuizCard";
import { Button, Form, Card, Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class TeacherDashboard extends React.Component {
  state = {
    name: "",
    info: "New Query",
    q_id: {},
    qActive: [],
    redirect: false,
    quizzes: [],
    toggle: false,
    anon: true
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

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, info, anon } = this.state;
    const newQuiz = {
      name: name,
      info: info,
      anon: anon,
      user_id: this.props.user.id
    };
    axios.post("/api/submissions", { quiz: newQuiz }).then(res => {
      this.setState({
        name: "",
        info: "New Query",
        quizzes: [res.data, ...this.state.quizzes]
      });
      this.setRedirect(res.data);
    });
  };

  render() {
    const { qActive } = this.state;
    return (
      <Container>
        {qActive.length !== 0 ? (
          <div>
            <Card.Group centered>
              {this.state.qActive.map(quiz => (
                <ActiveCard
                  user={this.props.user}
                  quiz={quiz}
                  key={quiz.id}
                  shuffle={this.shuffle}
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
            <Card>
              <Card.Meta style={{ marginTop: "13px", marginLeft: "15px" }}>
                {" "}
                {this.nowDate()}{" "}
              </Card.Meta>
              <Form size="tiny" onSubmit={this.handleSubmit}>
                <Form.Input
                  style={{ marginTop: "0px", marginBottom: "0px" }}
                  placeholder="New Query Name"
                  autoFocus
                  name="name"
                  value={this.state.name}
                  required
                  onChange={this.handleChange}
                />
              </Form>
              <Button
                style={{ marginTop: "7px", color: "white", backgroundColor: "#9219FF" }}
                size="mini"
                onClick={() => this.handleSubmit()}
              >
                Create New Query
              </Button>
            </Card>
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
export default TeacherDashboard;
