import React from "react";
import { Header, Container } from "semantic-ui-react";

const QuizSideInfo = () => {
  document.body.style = "background: #5906A3;";
  
  return (
    <Container>
      <Header as="h1" style={textStyle}>
        {/* {quiz.name} */} check your understanding
      </Header>
      <Header as="h4" style={textStyle}>
        {/* {quiz.info} */} explanation of the question
      </Header>
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
      <Header as="h4" style={textStyle}>
        Time Remaining
      </Header>
      <Header as="h4" style={textStyle}>
        5 minutes
      </Header>
      <Header as='h2' style={textStyle}>
        Submitted at:
      </Header>
      <Header as='h5' style={textStyle}>
        tuesday March 8, etc
      </Header>
    </Container>
  );
};
const textStyle = {
  color: "white",
  textAlign: "center",
  font: 'menlo',
  fontStyle: 'oblique'
};

export default QuizSideInfo;
