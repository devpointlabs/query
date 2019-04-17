import React, { useState, useEffect} from 'react';
import { Card } from 'semantic-ui-react';
import axios from "axios";

const Grade = ({id,}) => {
  const [grade, setGrade] = useState("");

  useEffect(() => {
    axios.get(`/api/submissions/${id}/get_grade`)
      .then( res => setGrade(res.data.grade))
      .catch( err => console.log(err))
  }, [])

  const getGrade = () => {
    return `${grade * 100}%`
  }


  return (
    <Card.Header>Grade: {getGrade()}  </Card.Header>
  )
}
export default Grade;