import React, { useState, useEffect, } from "react";
import axios from 'axios'
import styled from 'styled-components'
import Navbar from '../Navbar'

const QuizSideInfo = ({ quiz_id }) => {
  const [quiz, setQuiz] = useState([])

  useEffect(() => {
    axios.get(`/api/quizzes/${quiz_id}/`)
      .then(res => {
        setQuiz(res.data)
      })
  }, []);
  
  return (
    <div>
    <SideDiv> 
      <BigHead>
        {quiz.name}
      </BigHead>
      <MedHead>
        {quiz.info}
      </MedHead>
      <hr />
      {quiz.anon ? (
        <MedHead>
          Submission is <strong>Anonymous</strong>
        </MedHead>
      ) : (
        <MedHead>
          Submission is <strong>Identified</strong>
        </MedHead>
      )}
      {quiz.anon ? (
        <SmallHead>
          The creator of this query won't know who you are.
        </SmallHead>
      ) : (
        <SmallHead>
          The creator of this query will know who you are.
        </SmallHead>
      )}
      <SmallHead>
        Time Remaining:
        5 minutes
      </SmallHead>
      <MedHead>
        Submitted at:
      <SmallHead>
        04/20/69
      </SmallHead>
      </MedHead>
    </SideDiv> 
  </div>
  );
};

const SideDiv = styled.div`
  color: white;
  justify-content: center;
  letter-spacing: .2rem;
  padding: 45px;
  border: 15px;
`

const BigHead = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  font-family: menlo;
  padding: 10px;
  margin: 5px;
`

const MedHead = styled.div`
  font-size: 1.1rem;
  font-family: menlo;
  font-weight: normal;
  padding: 10px;
  margin: 5px;
`

const SmallHead = styled.h4`
  font-family: menlo;
  font-size: .9em;
  font-style: italic;
  padding: 10px;
  margin: 5px;
`
export default QuizSideInfo;
