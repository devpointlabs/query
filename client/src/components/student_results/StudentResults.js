import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import SubChoices from './SubChoices'

const StudentResults = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect( () => {
    axios.get(`/api/quizzes/28/questions`)
      .then( res => {
        setQuestions(res.data)
      })
  }, []);

  const renderQuestions = questions.map(q => (
      <QDiv key={q.id}>
        <QHead>
          {q.name}
        </QHead>
          <SubChoices
            ques_id={q.id}
          /> 
      </QDiv>
    ))
  

  return (
    <>
    <Grid>
      <Purple>
      </Purple>
      <Questions>
        <SubChoices
        />
      </Questions>
    </Grid>
    </>
  )

}

const Grid = styled.div`
  display: grid;
  font-family: menlo;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  margin: 0;
`

const Purple = styled.div`
  background: #5906A3;
`

const Questions = styled.div`
  padding: 25px;
`

const QHead = styled.h3`
  font-family: menlo;
`

const QDiv = styled.div`
  font-family: menlo;
  padding: 10px;
`

export default StudentResults
