import React, {useState} from 'react';
import {Button, Form, Input, Checkbox} from 'semantic-ui-react';

function MultiForm() {
  const [questA, setQuestA] = useState('');
  const [questB, setQuestB] = useState('');
  const [questC, setQuestC] = useState('');
  const [questD, setQuestD] = useState('');
  const [correct, setCorrect] = useState(false);
  document.body.style = 'background: #6D55A3;';

  return (
    <Form>
      <Form.Group>
        <Form.Input
          control={Input}
          width={12}
          placeholder="Question"
          name="questA"
          value={questA}
          onChange={e => setQuestA(e.target.value)}
        />
        <Form.Checkbox
          control={Checkbox}
          label={{children: 'Answer ?'}}
          onClick={e => setCorrect(e.target.value)}
          name="correct"
          value={correct}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          control={Input}
          width={12}
          placeholder="Question"
          name="questB"
          value={questB}
          onChange={e => setQuestB(e.target.value)}
        />
        <Form.Checkbox
          control={Checkbox}
          label={{children: 'Answer ?'}}
          onClick={e => setCorrect(e.target.value)}
          name="correct"
          value={correct}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          control={Input}
          width={12}
          placeholder="Question"
          name="questC"
          value={questC}
          onChange={e => setQuestC(e.target.value)}
        />
        <Form.Checkbox
          control={Checkbox}
          label={{children: 'Answer ?'}}
          onClick={e => setCorrect(e.target.value)}
          name="correct"
          value={correct}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          control={Input}
          width={12}
          placeholder="Question"
          name="questD"
          value={questD}
          onChange={e => setQuestD(e.target.value)}
        />
        <Form.Checkbox
          control={Checkbox}
          label={{children: 'Answer ?'}}
          onClick={e => setCorrect(e.target.value)}
          name="correct"
          value={correct}
        />
      </Form.Group>
      <Button
        inverted
        // onSubmit={e =>
      >
        Submit
      </Button>
    </Form>
  );
}

export default MultiForm;
