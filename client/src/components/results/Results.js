import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, List } from 'semantic-ui-react';
import Choices from './Choices'
import Grade from './Grade'
import Navbar from '../Navbar'

const Results = (props) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get(`/api/submissions_by_quiz?quiz_id=${props.location.state.quiz_id}`)
      .then(res => {
        setSubmissions(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const renderSubmissions = () => {
    return submissions.length >= 1 ?
      (submissions.map(sub => {
        return (
          <Card key={sub.id}>
            <Card.Content>
              <Card.Header>{sub.name}</Card.Header>
              <Card.Meta>{sub.email}</Card.Meta>
            </Card.Content>
            <Card.Content>
              <List>
                <Choices id={sub.id} />
              </List>
            </Card.Content>
            <Card.Content extra>
              <Grade id={sub.id} />
            </Card.Content>
          </Card>)
      }))
      :
      (<h1
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white"
        }}
      >
        There are no submissions for this quiz
      </h1>)
  }

  document.body.style = 'background: #5906A3;'

  return (
    <>
      <Navbar />
      <Card.Group centered>
        {renderSubmissions()}

      </Card.Group>
    </>
  )
}


export default Results;