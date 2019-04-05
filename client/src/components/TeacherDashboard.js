import React from "react";
import { Button, Form, Header, Card } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class TeacherDashboard extends React.Component {
  state = { name: "", info: "", q: [], redirect: false, quizzes: [] };

  dater = a => {
    let b = Date(a);
    let c = b
      .split(" ")
      .splice(1, 3)
      .join(" ");
    return c;
  };
  setRedirect = theChoosenOne => {
    this.setState({
      redirect: true,
      q: theChoosenOne
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      const quiz = this.state.q;
      return <Redirect quiz={quiz} to={`/${quiz.name}/${quiz.id}`} />;
    }
  };

  componentDidMount() {
    axios.get("/api/quizzes").then(res => {
      this.setState({ quizzes: res.data.reverse() });
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newQuiz = this.state;
    axios.post("/api/quizzes", newQuiz).then(res => {
      this.setState({
        name: "",
        info: "",
        quizzes: [res.data, ...this.state.quizzes]
      });
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="New Quiz Name"
              name="name"
              value={this.state.name}
              required
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Quiz Description"
              name="info"
              value={this.state.info}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button inverted>Create New Quiz</Button>
        </Form>
        <Header as="h2" inverted>
          Your quizzes
        </Header>
        <div style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
          <Card.Group centered>
            {this.state.quizzes.map(quiz => (
              <Card
                color="violet"
                key={quiz.id}
                link
                onClick={() => this.setRedirect(quiz)}
                meta={this.dater(quiz.created_at)}
                header={quiz.name}
                description={quiz.info}
              >
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
