import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

function SubChoices({sub_id, quiz_id}) {
  const [subChoice, setSubChoice] = useState([]);

  // returns submission choice,
  // the choice (choice_id, answer, correct) it belongs to,
  // question (question_type, question_text)
  // and {choices} belonging to question not selected by student
  useEffect(() => {
    axios.get(`/api/${sub_id}/student_choices/`).then(res => {
      setSubChoice(res.data);
    });
  }, []);

  const renderQuestions = subChoice.map(q => {
    if (q.question_type === 'open') {
      return renderOpen(q);
    }
    return (
      <div>
        <QDiv key={q.id}>
          <QHead>{q.question_text}</QHead>

          {q.choices.map(choices => {
            if (q.choice_id === choices.id) return subChoices(choices);
            return renderChoices(choices);
          })}
          <MetaDiv>
            <br />
            Explanation: {q.explanation}
          </MetaDiv>
        </QDiv>
      </div>
    );
  });

  function renderOpen(q) {
    return (
      <QDiv>
        <QHead>{q.question_text}</QHead>
        <OpenDiv>{q.choice.student_answer}</OpenDiv>
        <MetaDiv>
          <br />
          Explanation: {q.explanation}
        </MetaDiv>
      </QDiv>
    );
  }

  function renderChoices(choices) {
    if (choices.correct_answer) {
      return (
        <ChoiceDiv key={choices.id}>
          <input type="radio" id={choices.id} readOnly={true} disabled />
          <label>{choices.answer}</label>
          <p style={{display: 'inline'}}> &lt;= Correct Answer</p>
        </ChoiceDiv>
      );
    }
    return (
      <ChoiceDiv key={choices.id}>
        <input type="radio" id={choices.id} readOnly disabled />
        <label>{choices.answer}</label>
      </ChoiceDiv>
    );
  }

  function subChoices(choices) {
    if (choices.correct_answer) {
      return (
        <Right key={choices.id}>
          <RInput checked={true} readOnly disabled />
          <label>{choices.answer}</label>
        </Right>
      );
    }
    return (
      <Wrong key={choices.id}>
        <WInput type="radio" className="wrong" checked disabled />
        <label>{choices.answer}</label>
      </Wrong>
    );
  }

  document.body.style = 'background: white;' 

  return (
    <div>
    {renderQuestions}
    { subChoice.length === 0 ? <Msg> You did not submit any answers for this Quiz</Msg> : null }
    </div>
  )
}

const Msg = styled.h1`
  text-align: center;
  color: red;
`

const Right = styled.div`
  display: inline-block;
  margin-right: 20px;
  padding: 4px;
  font-size: 1rem;
  color: #5906a3;
  font-weight: bold;
  > input {
    color: #5906a3;
  }
`;

const Wrong = styled.div`
  display: inline-block;
  margin-right: 20px;
  padding: 4px;
  font-size: 1rem;
  color: red;
  font-weight: bold;
  > input {
    background: red;
  }
`;

const RInput = styled.input.attrs({type: 'radio'})`
  &:checked {
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #5906a3;
    margin-right: 20px;
  }
`;

const WInput = styled.input.attrs({type: 'radio'})`
  &:checked {
    border: 1px solid #ddd;
    border-radius: 100%;
    background: red;
    margin-right: 20px;
  }
`;

const QHead = styled.h4`
  font-family: menlo;
  font-size: 1.5rem;
`;

const QDiv = styled.div`
  font-family: menlo;
  padding: 15px;
  margin-top: 20px;
`;

const ChoiceDiv = styled.div`
  font-family: menlo;
  padding: 4px;
  margin-right: 20px;
  font-size: 1rem;
  color: grey;
`;

const OpenDiv = styled.div`
  font-family: menlo;
  color: grey;
  padding: 10px;
`;
const MetaDiv = styled.div`
  font-size: 0.8em;
`;

export default SubChoices;
