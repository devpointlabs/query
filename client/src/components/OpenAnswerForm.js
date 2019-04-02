import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";

function OpenAnswerForm() {
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrect] = useState(false);
  document.body.style = "background: #6D55A3;";

  return (
    <Form>
      <Form.Group>
        <Form.Input
          required
          control={Input}
          label="Input Your Question"
          name="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default OpenAnswerForm;
