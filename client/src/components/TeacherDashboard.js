import React from 'react';
import ActiveCard from "./ActiveQuizCard"
import { Button, Form, Header, Card, Divider } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class TeacherDashboard extends React.Component {
  state = { name: "", info: "", q_id:{}, qActive:[], redirect: false, quizzes:[]}

  dater = (a) => {
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
      q_id: theChoosenOne
    })
  }
  timer = () => {
    if(this.state.end !== ""){
  let time = (""+Date.now() ).split("");
  time.splice(0, time.count - 13)
  time = parseInt(time.join(''))
  let timer = parseInt(this.state.end) - time
  let min = Math.floor((timer/1000/60) << 0)
  let sec = Math.floor((timer/1000) % 60)
  if (sec < 10) {
    sec = "0" + sec
  }
  let clock = `Time Remaining [${min}:${sec}]  `
  if( timer <= 0){
    axios.patch(`/api/quizzes/${this.props.id}`, {end: "", active: false })
    .then( res => { 
      this.setState({ lenght: null, active: res.data.active, end: res.data.end});
    })
  }
  this.setState({clock: clock})
}}
  renderRedirect = () => {
    if (this.state.redirect) {
      const quiz = this.state.q_id
      return <Redirect quiz={quiz} to={`/${quiz.name}/${quiz.id}`} />
    }
  };

  componentDidMount(){
    axios.get("/api/quizzes")
        .then( res => {
          res.data.map( q => { 
            // console.log(q)
            if(q.active){
              this.setState({qActive: [q, ...this.state.qActive]})
            }
            else{
              this.setState({quizzes: [q, ...this.state.quizzes]})
            }
          })
        })
    }
  

  shuffle = () => {
    this.setState({qActive: [], quizzes: []})
    axios.get("/api/quizzes")
      .then(res =>{
        res.data.map( q => { 
          console.log(q)
          if(q.active){
            this.setState({qActive: [q, ...this.state.qActive]})
          }
          else{
            this.setState({quizzes: [q, ...this.state.quizzes]})
          }
        })
      })
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
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
    const { qActive, } = this.state
    // console.log(qActive)
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
        <Header as="h1" inverted>Your quizzes</Header>
          {qActive.length !== 0 ? 
          <div style={{backgroundColor:"#fff", borderRadius:"15px",}}>
          <Header as="h3" style={{textAlign:"center", color:"#6D55A3"}}inverted>Active Quizzes</Header>
          <Card.Group centered>
            {this.state.qActive.map( quiz => (
              <ActiveCard quiz={quiz} key={quiz.id} shuffle={() => this.shuffle()}/>
            ))}
            </Card.Group>
          </div>
             : null  }
          <Divider/>
          <div style={{backgroundColor:"#fff", borderRadius:"15px",}}>
          <Header as="h3" style={{textAlign:"center", color:"#6D55A3"}}inverted>Created Quizzes</Header>
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
      </div>
    );
  }
}
export default TeacherDashboard;
