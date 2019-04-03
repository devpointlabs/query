import React from 'react';
import axios from 'axios';

class TeacherQuizzes extends React.Component {
  state = { quizzes: [], }

  componentDidMount() {
    axios.get("/api/quizzes")
      .then( res => {
        this.setState({ quizzes: res.data, })
      })
  }


  render() {
    return (
      <ul>
        {this.state.quizzes.map( quiz => <li key={quiz.id} color="white">{quiz.name}</li>)}
      </ul>
    )
  }
}

export default TeacherQuizzes;