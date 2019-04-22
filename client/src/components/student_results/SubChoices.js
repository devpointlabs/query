import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import styled from 'styled-components'

function SubChoices({ sub_id, quiz_id, }) {
  const [subChoice, setSubChoice] = useState([]);

    // returns submission choice,
    // the choice (choice_id, answer, correct) it belongs to,
    // question (question_type, question_text)
    // and {choices} belonging to question not selected by student
  useEffect(() => {
    axios.get(`/api/${sub_id}/student_choices/`)
      .then(res => {
        setSubChoice(res.data)
      })
  }, []);

  const renderQuestions = subChoice.map(q => {
    if (q.question_type === "open") {
      return renderOpen(q);
    }
    return (
      <>
        <QDiv key={q.id}>
          <QHead>
            {q.question_text}
          </QHead>

          {q.choices.map(choices => {
            if (q.choice_id === choices.id)
              return subChoices(choices);
            return renderChoices(choices);
          })}
          <MetaDiv>
            <br />
            Explanation: {q.explanation}
          </MetaDiv>
        </QDiv>

      </>
    )
  })

  function renderOpen(q) {
    return (
      <QDiv>
        <QHead>
          {q.question_text}
        </QHead>
        <OpenDiv>
          {q.choice.student_answer}
        </OpenDiv>
      </QDiv>
    )
  }

  function renderChoices(choices) {
    if (choices.correct_answer) {
      return <ChoiceDiv key={choices.id}>
        <input
          style={{
            border: "6px solid #5906A3",
            marginRight: "10px"
          }}
          type="radio"
          disabled={true}
        />
        <p style={{ display: "inline" }}>{choices.answer} {" "} &lt;= Correct Answer</p>
      </ChoiceDiv>
    }
    return <ChoiceDiv key={choices.id}>
      <input
        style={{
          border: "6px solid #5906A3",
          marginRight: "10px"
        }}
        type="radio"
        disabled={true}
      />
      {choices.answer}
    </ChoiceDiv>
  }

  function subChoices(choices) {
    if (choices.correct_answer) {
      return <Right key={choices.id}>
        <input
          style={{
            border: "6px solid #5906A3",
            marginRight: "10px"
          }}
          type="radio"
          checked
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
        checked
      />
      {choices.answer}
    </Wrong>
  }

  return (
    <>
      {renderQuestions}
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
  font-family: menlo;
  color: grey;
`

const OpenDiv = styled.div`
  font-family: menlo;
  color: grey;
  padding: 10px;
`
const MetaDiv = styled.div`
  font-size: 0.8em;
`

export default SubChoices
