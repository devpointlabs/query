import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { Button, Form, } from 'semantic-ui-react';
class Register extends React.Component {
  state = { email: "", password: "", passwordConfirmation: "", }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation } =  this.state;
    const { auth: { handleRegister, }, history, } =  this.props;

    if (password === passwordConfirmation)
      handleRegister({email, password, passwordConfirmation, }, history)
    else  
      alert("Please retype the password and confirmation")
  }

  render() {
    const { email, password, passwordConfirmation, } = this.state;
    return ( 
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
        label="Email"
        name="email"
        required
        autoFocus
        value={email}
        onChange={this.handleChange}
        />
        <Form.Input
        label="Password"
        name="password"
        required
        value={password}
        onChange={this.handleChange}
        type="password"
        />
        <Form.Input
        label="Password Confirmation"
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={this.handleChange}
        type="password"
        required
        />
        <Button>Create Account</Button>
      </Form>
    )
  }
}
export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}