import React, { Fragment, } from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends React.Component {
  
  state = { editing: false, formValues: { name: '', email: '', }, };
  
  componentDidMount() {
    const { auth: { user: { name, email, }, }, } = this.props;
    this.setState({ formValues: { name, email, }, });
  }
  
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }
  
  profileView = () => {
    const { auth: { user }, } = this.props;
    return (
      <Fragment>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{user.name}</Header>
          <Header as="h1">{user.email}</Header>
        </Grid.Column>
      </Fragment>
    )
  }
  
  editView = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { name, email } } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column width={8}>
          <Form.Input
            name="name"
            placeholder="name (required)"
            value={name}
            required
            onChange={this.handleChange}
          />
          <Form.Input
            name="email"
            placeholder="email (required)"
            value={email}
            required
            onChange={this.handleChange}
          />
          <Button circular inverted>Update</Button>
        </Grid.Column>
      </Form>
    )
  }
  
  render() {
    document.body.style = 'background: #6D55A3;'

    const { editing, } = this.state;
    return (
      <Container>
        <Divider hidden />
        <br />
        <Grid>
          <Grid.Row>
            { editing ? this.editView() : this.profileView()}
            <Grid.Column>
              <Button circular inverted size="huge" onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth => 
      <Profile { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile;