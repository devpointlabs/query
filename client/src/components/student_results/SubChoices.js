import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import styled from 'styled-components'

function SubChoices({ ques_id, }) {
  const [subChoice, setSubChoice] = useState([]);

  useEffect( () => {
    // submission id needed
    axios.get(`/api/27/student_choices/`)
      .then( res => {
        setSubChoice(res.data)
      })
  }, []);

  const renderQuestions = subChoice.map( q => (
    <QDiv key={q.id}>
    <QHead>
    {q.question_text}
    </QHead>

      {q.choices.map( choices => {
        if (q.choice_id === choices.id)
          return subChoices(choices);
        return(
        <ChoiceDiv key={choices.id}>
        <input
          style={{
            border: "6px solid #5906A3",
            marginRight: "10px"
          }}
          type="radio"
          disabled={ true }
        />
        {choices.answer}
        </ChoiceDiv>
        )})}
      </QDiv>
    ))

  function subChoices (choices) {
    if (choices.correct_answer) {
      return <Right key={choices.id}>
              <input
                style={{
                  border: "6px solid #5906A3",
                  marginRight: "10px"
                }}
                type="radio"
                readOnly
              />
              {choices.answer}
            </Right>
    }
      return <Wrong key={choices.id}>
              <input
                style={{
                  border: "6px solid #5906A3",
                  marginRight: "10px"
                }}
                type="radio"
                readOnly
              />
              {choices.answer}
            </Wrong>
  }


  return (
    <>
    { renderQuestions }
    </>
  )


}

const Right = styled.div`
  display: inline-block;
  color: #5906A3;
  font-weight: bold;
`

const Wrong = styled.div`
  display: inline-block;
  color: red;
  font-weight: bold;
`

const QHead = styled.h4`
  font-family: menlo;
`

const QDiv = styled.div`
  font-family: menlo;
  padding: 20px;
`

const ChoiceDiv = styled.div`
  color: grey;
`

export default SubChoices
