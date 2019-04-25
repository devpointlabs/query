import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../Navbar';

const QuizSideInfo = ({quiz_id, sub_id}) => {
  const [quiz, setQuiz] = useState([]);
  const [submittedAt, setSubmittedAt] = useState([]);

  useEffect(() => {
    axios.get(`/api/quizzes/${quiz_id}/`).then(res => {
      setQuiz(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/submitted/${sub_id}/`).then(res => {
      setSubmittedAt(res.data);
    });
  }, []);

  // navbar
  return (
    <DescContainer>
      <NavDiv>
        <Navbar />
      </NavDiv>
      <div
        style={{
          margin: '20px',
          marginTop: '125px',
        }}>
        <div style={{}}>
          <HeaderText fSize="small">{quiz.name}</HeaderText>
          <StyledP style={{marginBottom: '15px'}}>{quiz.info}</StyledP>
        </div>
        <div>
          <hr
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              width: '100%',
              height: '1px',
            }}
          />
        </div>

        {/* Switches quiz description depending wether it is a anonymous or identified quiz */}
        {quiz.anon ? (
          <StyledP style={{marginTop: '20px'}}>
            Submission is <strong>Anonymous</strong>
          </StyledP>
        ) : (
          <StyledP style={{marginTop: '20px'}}>
            Submission is <strong>Identified</strong>
          </StyledP>
        )}
        {quiz.anon ? (
          <StyledI>The creator of this query won't know who you are.</StyledI>
        ) : (
          <StyledI>The creator of this query will know who you are.</StyledI>
        )}
        <StyledP style={{marginTop: '30px'}}>Submitted At:</StyledP>
        <StyledP style={{size: '.5rem'}}>{submittedAt}</StyledP>
      </div>
    </DescContainer>
  );
};

const DescContainer = styled.div`
  background: #5906a3;
  padding-bottom: 25px;
  margin: -5px;
`;

const HeaderText = styled.h1`
  color: white !important;
  font-family: menlo;
  font-size: ${props => fontSize(props.fSize)} !important;
`;

const fontSize = size => {
  switch (size) {
    case 'large':
      return '4rem';
    case 'medium':
      return '2rem';
    case 'small':
      return '1.5rem';
    case 'tiny':
      return '.75rem';
    default:
      return '1rem';
  }
};

const SideDiv = styled.div`
  color: white;
  justify-content: center;
  letter-spacing: 0.2rem;
  padding: 45px;
  border: 15px;
`;

const StyledP = styled.p`
  color: white;
`;
const StyledI = styled.i`
  color: white;
`;

const NavDiv = styled.div`
  padding-top: 9px;
`;

export default QuizSideInfo;
