import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  }

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  }

  const handleClick = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.checked })); 
  }

  return {
    handleChange,
    handleSubmit,
    handleClick,
    values,
  }
}

export default useForm;
