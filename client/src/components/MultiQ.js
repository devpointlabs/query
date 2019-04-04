import React from 'react';
import useForm from './useForm';
import MultiForm from './MultiForm';
import { Button, Form, Input, } from 'semantic-ui-react';

class MultiQ extends React.Component {
  state = { question: '' }

  render() {
    return(
      <MultiForm />
    )
  }
}
export default MultiQ;
