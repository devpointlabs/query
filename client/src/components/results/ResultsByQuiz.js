import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import Navbar from '../Navbar';
import { Link, } from 'react-router-dom'

const ResultsByQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("/api/quizzes")
      .then(res => {
        setQuizzes(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  document.body.style = 'background: #5906A3;'

  return (
    <>
      <Navbar />
      <Card.Group centered>
        {quizzes.map(q => (
          <Card key={q.id}
            link
            as={Link}
            to={{ pathname: "/results", state: { anon: q.anon, quiz_id: q.id } }}>
            <Card.Content>
              <Card.Header>{q.name}</Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  )
}

export default ResultsByQuiz;