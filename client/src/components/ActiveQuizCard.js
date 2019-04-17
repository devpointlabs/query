import React from 'react';
import {Card,} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

class ActiveCard extends React.Component {
  state = {clock: null, interval: null, fire: true }

  componentDidMount(){
    this.setState({q_id: this.props.quiz.id, active: this.props.quiz.active, end: this.props.quiz.end, interval: setInterval(this.timer, 1000)});

  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  timer = () => {
    if(this.state.end !== "" && this.state.fire === true){
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
  if( timer <= 0 && this.state.fire === true){
    this.setState({fire: false})
      this.props.shuffle(this.props.quiz.id)
    }

  this.setState({clock: clock})
}}

dater = (a) => {
  let b = Date(a)
  let c = b.split(" ").splice(1,3).join(" ")
  return(c)
}

setRedirect = (theChoosenOne) => {
  this.setState({
    redirect: true,
    q_id: theChoosenOne
  })
}

renderRedirect = () => {
  if (this.state.redirect) {
    const quiz = this.state.q_id
    return <Redirect quiz={quiz} to={this.props.user ? `/quizbuilder/${quiz.id}` : `/quizzes/${quiz.id}/quiz`} />
  }
}

render(){
  const{quiz} = this.props
  return(
    <Card color="red" 
    link
    onClick={() => this.setRedirect(this.props.quiz)}
    >
    <Card.Content>
      <Card.Meta style={this.state.clock !== null ? {color: "red"} : null}> {this.state.clock !== null ? this.state.clock : this.dater(quiz.created_at)} </Card.Meta>
      <Card.Header style={{marginTop: "7px",}}>{quiz.name}</Card.Header>
      <Card.Description>{quiz.info}</Card.Description>
      {this.renderRedirect()}
      </Card.Content>

    </Card>
 )}

}

export default ActiveCard