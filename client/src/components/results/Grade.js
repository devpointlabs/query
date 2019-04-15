import React, { useState, useEffect} from 'react';
import { Card } from 'semantic-ui-react';
import axios from "axios";

const Grade = ({id,}) => {
  const [choices, setChoices] = useState([]);
  const [grade, setGrade] = useState("");

  useEffect(() => {
    axios.get(`/api/${id}/student_choices`) 
      .then( res => {
        setChoices(res.data)
      })
      .catch( err => console.log(err))
  }, [])

  const getGrade = () => {
    let wrongQs = choices.filter( c => !c.correct)
    let RightQs = choices.filter( c => c.correct)
    let grade = RightQs.length / choices.length
    return `${grade * 100}%`
  }


  return (
    <Card.Header>Grade: {getGrade()}</Card.Header>
  )
}
export default Grade;