import React from "react";
import styled from 'styled-components'

const QuizSideInfo = () => {
  
  return (
    <SideDiv> 
      <BigHead>
        {/* {quiz.name} */} Check Your Understanding
      </BigHead>
      <MedHead>
        {/* {quiz.info} */} Answer the following questions about the lecture today so far today.
      </MedHead>
      <hr />
      {/* {anon ? (
        <Header as="h4" style={textStyle}>
          Submission is <strong>Anonymous</strong>
        </Header>
      ) : (
        <Header as="h4" style={textStyle}>
          Submission is <strong>Identified</strong>
        </Header>
      )}
      {anon ? (
        <Header as="p" style={textStyle}>
          The creator of this query won't know who you are.
        </Header>
      ) : (
        <Header as="p" style={textStyle}>
          The creator of this query will know who you are.
        </Header>
      )} */}
      <SmallHead>
        Time Remaining:
        5 minutes
      </SmallHead>
      <MedHead>
        Submitted at:
      <SmallHead>
        {/* tuesday March 8, etc */}
        04/20/69
      </SmallHead>
      </MedHead>
    </SideDiv> 
  );
};

const SideDiv = styled.div`
  color: white;
  text-align: center;
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
  font-weight: normal;
  padding: 10px;
  margin: 5px;
`

const textStyle = {
  color: "white",
  textAlign: "center",
  fontFamily: 'menlo',
  // fontStyle: 'oblique'
};

export default QuizSideInfo;
