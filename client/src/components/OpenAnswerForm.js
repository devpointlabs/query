import React, { useState } from "react";
import { Form, Input, Button, Grid } from "semantic-ui-react";

function OpenAnswerForm() {
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrect] = useState(false);
  document.body.style = "background: #6D55A3;";

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          required
          control={Input}
          placeholder="Input Your Open Ended Question"
          name="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </Form.Group>
      <Grid>
        <Grid.Column textAlign="right">
          <Button circular inverted size="big" type="submit">
            Submit
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
}

export default OpenAnswerForm;
