import React, { useState, useEffect} from 'react'
import axios from 'axios';

const ResultsByQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("/api/quizzes") 
      .then( res => {
        setQuizzes(res.data)
      })
      .catch( err => console.log(err))
  }, [])
  return (
    <div></div>
  )
}

export default ResultsByQuiz;