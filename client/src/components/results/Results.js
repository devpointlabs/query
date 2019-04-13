import React, { useState, useEffect} from 'react';
import axios from 'axios'
import { Card } from 'semantic-ui-react';

const Results = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get("/api/student_submissions") 
      .then( res => setSubmissions(res.data))
      .catch( err => console.log(err))
  }, [])

  const renderSubmissions = () => {
    debugger
    return submissions.map( sub => (
      <Card key={sub.id}>
        <Card.Header>{sub.quiz}</Card.Header>

      </Card>
    ))
  }

  return (
    <>
      <Card.Group>
        {submissions.map( sub => (
          <Card key={sub.id}>
            <Card.Header>{sub.quiz}</Card.Header>
          </Card>
        ))}
      </Card.Group>
    </>
  )
}
export default Results;