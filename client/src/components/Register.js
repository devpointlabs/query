import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { Button, Form, Header, Grid} from 'semantic-ui-react';
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
    document.body.style = 'background: #6D55A3;'
    const { email, password, passwordConfirmation, } = this.state;
    return ( 
      <Grid>
        <Grid.Column textAlign="center">
      <Header style={{color: "#fff", fontSize: "100px", textAlign: "center",}}>
        Register
      </Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
        style={{color: "#fff"}}
        placeholder="Email"
        name="email"
        required
        autoFocus
        value={email}
        onChange={this.handleChange}
        />
        <Form.Input
        style={{color: "#fff"}}
        placeholder="Password"
        name="password"
        required
        value={password}
        onChange={this.handleChange}
        type="password"
        />
        <Form.Input
        placeholder="Password Confirmation"
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={this.handleChange}
        type="password"
        required
        />
        <Button inverted color="white">Register Account</Button>
      </Form>
      </Grid.Column>
        </Grid>
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