import React from 'react';
import styled from 'styled-components';
import SubChoices from './SubChoices';
import QuizSideInfo from './QuizSideInfo';
import {useWindowWidth} from '../../hooks/useWindowWidth';

const StudentResults = props => {
  const {quiz_id, sub_id} = props.location.state;
  const width = useWindowWidth();

  if (width < 620)
    return (
      <>
        <MobilePurple>
          <QuizSideInfo quiz_id={quiz_id} sub_id={sub_id} />
        </MobilePurple>
        <MobileQuestions>
          <SubChoices quiz_id={quiz_id} sub_id={sub_id} />
        </MobileQuestions>
      </>
    );
  return (
    <>
      <Grid>
        <Purple>
          <QuizSideInfo quiz_id={quiz_id} sub_id={sub_id} />
        </Purple>
        <Questions>
          <SubChoices quiz_id={quiz_id} sub_id={sub_id} />
        </Questions>
      </Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  font-family: menlo;
  grid-template-columns: 40vw auto;
  margin: 0;
`;

const Purple = styled.div`
  background: #5906A3;
  width: 40vw;
  height: 100vh
  position: fixed;
`;
const MobilePurple = styled.div`
  background: #5906a3;
  margin: 0;
  padding: 0px;
`;

const Questions = styled.div`
  grid-column-start: 2;
  bakground-color: white !important;
  padding: 25px;
  margin-top: 58px;
`;
const MobileQuestions = styled.div`
  bakground-color: white;
`;
export default StudentResults;
