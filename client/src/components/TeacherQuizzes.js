import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom'
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
        {this.state.quizzes.map( quiz => <li key={quiz.id} color="white">{quiz.name}<Link to={`/quizzes/${quiz.id}`}>Go to quiz</Link></li>)}
      </ul>
    )
  }
}

export default TeacherQuizzes;