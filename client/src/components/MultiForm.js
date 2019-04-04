import React, {useState} from 'react';
import useForm from './useForm';
import {Button, Form, Input, Checkbox} from 'semantic-ui-react';

const MultiForm = () => {
  document.body.style = 'background: #6D55A3;';

  // common functions pulled from useForm hooks
  const {values, handleChange, handleSubmit, handleClick} = useForm(andPost);

  function andPost() {
    console.log(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input
          width={12}
          placeholder="Enter an answer"
          name="answer"
          value={values.answer || ''}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          label="Answer ?"
          name="correct"
          value={values.correct}
          onClick={handleClick}
        />
      </Form.Group>
      <Button inverted>Submit</Button>
    </Form>
  );
};

export default MultiForm;
