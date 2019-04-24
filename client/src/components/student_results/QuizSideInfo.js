import React, { useState, useEffect, } from "react";
import axios from 'axios'
import styled from 'styled-components'

const QuizSideInfo = ({ quiz_id, sub_id, }) => {
  const [quiz, setQuiz] = useState([])
  const [submittedAt, setSubmittedAt] = useState([])

  useEffect(() => {
    axios.get(`/api/quizzes/${quiz_id}/`)
      .then(res => {
        setQuiz(res.data)
      })
  }, []);
  
  useEffect(() => {
    axios.get(`/api/submitted/${sub_id}/`)
      .then(res => {
        setSubmittedAt(res.data)
      })
  }, []);

  // function dateTime() {
  //   let time = new Date(submittedAt[1])
  //   let weekday = date.toLocaleDateString("en-US", weekday: 'short') 
  //   let options = {
  //     weekday: 'short',
  //     month: 'long',
  //     day: 'numeric',
  //     year: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric'
  //   }
  //   let date = date.toLocaleDateString("en-US", options).replace( /[,]/g, '' )
  //   return
  // }

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
      <MedHead>
        Submitted At:
      <SmallHead>
       {submittedAt}
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
