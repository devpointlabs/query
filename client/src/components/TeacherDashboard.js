import React from 'react';
import { Button, Form, Header, Card } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
class TeacherDashboard extends React.Component {
  state = { name: "", info: "New Quiz", quiz:[], redirect: false, quizzes:[]}

  dater = (a) => {
    let b = Date(a)
    let c = b.split(" ").splice(1,3).join(" ")
    return(c)
}
  setRedirect = (theChoosenOne) => {
    this.setState({
      redirect: true,
      quiz: theChoosenOne
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      const quiz = this.state.quiz
      return <Redirect quiz={quiz} to={`/${quiz.name}/${quiz.id}`} />
    }
  }

    

  componentDidMount(){
    axios.get("/api/quizzes")
        .then( res => {
          this.setState({ quizzes: res.data.reverse(), })
        })
    }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newQuiz = this.state;
    axios.post("/api/quizzes", newQuiz)
      .then( res => { 
        this.setState({ name: "", info: "New Quiz", quizzes: [res.data, ...this.state.quizzes] });
      })
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
          <div style={{backgroundColor:"#fff", borderRadius:"15px",}}>
          <Card.Group centered>
            {this.state.quizzes.map( quiz => (
              <Card color="violet" 
              key={quiz.id}
              link
              onClick={() => this.setRedirect(quiz)}
              meta={this.dater(quiz.created_at)}                
              header={quiz.name}
              description={quiz.info}>
              {this.renderRedirect()}
              </Card>
                
               ))}
            </Card.Group>
          </div>
        </Form>
      </div>
    )
  }
}
export default TeacherDashboard;