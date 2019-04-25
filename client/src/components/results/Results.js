import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, List, } from 'semantic-ui-react';
import Choices from './Choices'
import Grade from './Grade'
import Navbar from '../Navbar'
import ResultsByQuiz from './ResultsByQuiz';

const Results = (props) => {
	const [submissions, setSubmissions] = useState([]);
	const [sumOfGrades, setSumOfGrades] = useState(0);
	const [countOfSubmissions, setCountOfSubmissions] = useState(0);

  useEffect(() => {
    axios.get(`/api/submissions_by_quiz?quiz_id=${props.location.state.quiz_id}`)
      .then(res => {
				setSubmissions(res.data)
				setCountOfSubmissions(res.data.length)
      })
			.catch(err => console.log(err))
	}, [])

	const avgGrade = () => {
		return  (sumOfGrades / countOfSubmissions) * 100
	}

	const gradeInc = grade => {
		setSumOfGrades(sumOfGrades + grade)
	}

  const renderSubmissions = (props) => {
    return submissions.length >= 1 ?
      (submissions.map(sub => {
        return (
          <Card key={sub.id}>
            <Card.Content>
              <Card.Header>{sub.name}</Card.Header>
              <Card.Meta>{props.location.state.anon ? "Anonymous" : sub.email }</Card.Meta>
            </Card.Content>
            <Card.Content>
              <List>
                <Choices id={sub.id} />
              </List>
            </Card.Content>
            <Card.Content extra>
              <Grade id={sub.id} gradeInc={gradeInc} />
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
			{ submissions.length > 0 ? 
			<h1 style={
			{ display: "flex",
				justifyContent: "center",
				color: "white", } 
			}
			> Average Score: {avgGrade().toFixed(2)}% </h1>
			:
			<></>
			}
      <Card.Group centered>
        {renderSubmissions(props)}

      </Card.Group>
    </>
  )
}


export default Results;
