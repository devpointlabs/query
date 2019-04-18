import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const SubChoice = ({ ques_id, }) => {
  const [subChoice, setSubChoice] = useState([]);
  const [choices, setChoices] = useState([]);

  useEffect( () => {
    debugger
    axios.get(`/api/27/student_choices/`)
      .then( res => {
        setSubChoice(res.data)
      })
  }, []);

    useEffect( () => {
    axios.get(`/api/questions/${ques_id}/choices`)
      .then( res => {
        setChoices(res.data)
      })
  }, []);

  const renderSubChoice = () => (
    subChoice.correct ? (
      <Right>subChoice.answer</Right>
    ) : (
      <Wrong>subChoice.answer</Wrong>
  ))


  const renderChoices = choices.map(c => (
      <div>
        <input
          type="radio"
          disabled="true"
        />
          {c.answer}
      </div>
    )
  )

  return (
    <>
      { renderChoices }
    </>
  )

}

const Right = styled.input`
  type="radio";
  color="#5906A3";
  checked="true"
`

const Wrong = styled.input`
  type="radio";
  color="red";
  checked="true"
`

export default SubChoice
