import { useState } from 'react';

const useForm = (callback) => {

  const [choices, setChoice] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  }

  const handleChange = (event) => {
    event.persist();
    setChoice(choice => ({ ...choices, [event.target.name]: event.target.value }));
  }

  const handleClick = (event) => {
    event.persist();
    setChoice(choice => ({ ...choices, [event.target.name]: event.target.checked })); 
  }

  return {
    handleChange,
    handleSubmit,
    handleClick,
    choices,
  }
}

export default useForm;
