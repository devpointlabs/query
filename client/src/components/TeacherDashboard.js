import React from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import axios from 'axios';
import TeacherQuizzes from './TeacherQuizzes'
class TeacherDashboard extends React.Component {
  state = { name: ""}

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newQuiz = this.state;
    axios.post("/api/quizzes", newQuiz)
      .then( res => console.log(res.data))
    this.setState({ name: ""})
  }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="New Quiz Name"
            name="name"
            value={this.state.name}
            required
            onChange={this.handleChange}
          />
          <Button inverted>Create New Quiz</Button>
          <Header as="h2" inverted>Your quizzes</Header>
          <TeacherQuizzes />
        </Form>
      </div>
    )
  }
}
export default TeacherDashboard;