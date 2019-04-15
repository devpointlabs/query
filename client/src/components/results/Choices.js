import React, { useState, useEffect} from 'react';
import axios from "axios";
import {Card} from 'semantic-ui-react'

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
      return (<li style={c.correct ? {color: "green"}: {color: "red"}}>{c.answer}</li>)
    })
  }
      
  return (
    <>
      {renderChoices()}
    </>
  )
}

export default Choices


