import React, { useState, useEffect, } from 'react'
import axios from 'axios'

const StudentQuizGraded = (props) => {
  const [subChoices, setSubChoices] = useState([]);
  const [choices, setChoices] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect( () => {
    axios.get(`/api/submissions/1/submission_choices/`)
      .then( res => {
        setSubChoices(res.data)
      })
  //   axios.get(`/api/quizzes/submission.quiz_id/`)
  //   subChoices.map(subChoice => {
  //     axios.get('/api/subChoice.
  //   }
  }, [])

  const renderSubChoices = () => {
    return subChoices.map(subChoice => (
      <div>
        {subChoice.choice_id}
        {subChoice.choice_id.correct_answer}
      </div>
    ))
  }

  return (
    <>
      { renderSubChoices() }
    </>
  )

}

export default StudentQuizGraded;
