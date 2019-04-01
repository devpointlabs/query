import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { Button, Form,} from 'semantic-ui-react';
class Login extends React.Component {
  state = { email: "", password: ""}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password,} =  this.state;
    this.props.auth.handleLogin({ email, password, }, this.props.history)
  }

  render() {
    const { email, password, } = this.state;
    return ( 
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
        label="Email"
        name="email"
        required
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
        <Button>Log-in</Button>
      </Form>
    )
  }
}
export default class ConnectedLogin extends React.Component{
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}