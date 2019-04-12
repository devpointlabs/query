import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { Button, Form, Header, Grid, Container} from 'semantic-ui-react';
import Navbar from './Navbar';
class Register extends React.Component {
  state = {teacher: false, name: "", email: "", password: "", passwordConfirmation: "", }

  componentDidMount(){
    if(this.props.match.url === "/register/teacher")
    this.setState({teacher: true})
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {teacher, name, email, password, passwordConfirmation } =  this.state;
    const { auth: { handleRegister, }, history, } =  this.props;
    
    if (password === passwordConfirmation){
      handleRegister({teacher, name, email, password, passwordConfirmation, }, history)}
    else  
      alert("Please retype the password and confirmation")
  }

  render() {
    document.body.style = 'background: #5906A3;'
    const {name, email, password, passwordConfirmation, } = this.state;
    return ( 
      <div>
        <Navbar />
      <Container>

      <Grid>
        <Grid.Column textAlign="center">
      <Header style={{color: "#fff", fontSize: "100px", textAlign: "center",}}>
        Register
        {this.state.teacher ? " Teacher" : null}
      </Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
        style={{color: "#fff"}}
        placeholder="Name"
        name="name"
        required
        autoFocus
        value={name}
        onChange={this.handleChange}
        />
        <Form.Input
        style={{color: "#fff"}}
        placeholder="Email"
        name="email"
        required
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
        </Container>
        </div>
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