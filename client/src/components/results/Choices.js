import React, { useState, useEffect} from 'react';
import axios from "axios";
import {List, } from 'semantic-ui-react'

const Choices = ({ id, }) => {

  const [choices, setChoices] = useState([]);

  useEffect(() => {
    axios.get(`/api/${id}/student_choices`) 
      .then( res => {
        setChoices(res.data)
      })
      .catch( err => console.log(err))
  }, [])

  const renderChoices = () => {
    return choices.map( c => {
      return (<List.Item  key={c.choice.id}>
      <strong>Question:</strong> {c.question_text} <br/> <span style={c.correct ? {color: "green"}: {color: "red"}}><strong>Student answered:</strong> {c.answer}</span>
      </List.Item>)
    })
  }
      
  return (
    <>
      {renderChoices()}
    </>
  )
}

export default Choices


