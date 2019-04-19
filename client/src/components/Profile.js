import React from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Grid, Image, Container, Divider, Header, Button, Card, } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Navbar from './Navbar';


const defaultImage = 'https://imgur.com/6qiAjc4.png' 

class Profile extends React.Component {
  
  state = { editing: false, formValues: { name: '', email: '', file: '', }, };

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0], } });
  }
    
  componentDidMount() {
    const { auth: { user: { name, email, }, }, } = this.props;
    this.setState({ formValues: { name, email, file: '' }, });
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
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { name, email, file, }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { name, email, file, });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }
  
  
  profileView = () => {
    const { auth: { user }, } = this.props;
    return (
    <div>
        <Grid.Column width={4}>
          <Image size="small" src={user.image || defaultImage }/>
        </Grid.Column>
        <br />
        <Grid.Column width={8}>
          <Header inverted as="h1">{user.name}</Header>
          <Header inverted as="h1">{user.email}</Header>
        </Grid.Column>
      </div>
    )
  }

  
  editView = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { name, email, file, } } = this.state;
    const blob = new Blob([file], {type: 'image/png'});
    const url = URL.createObjectURL(blob);
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
          previewContainer={true}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <Card
                style={styles.dropzone}
                {...getRootProps()}
                
              >
                <input {...getInputProps()} />
                { isDragActive ? <h1>Drop files here...</h1> 
                : <Image src={ blob.size === 0 ? user.image || defaultImage : url } />

                }
              </Card>
            )
          }}
        </Dropzone>
        </Grid.Column>
      <br />
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
    document.body.style = 'background: #5906A3;'

    const { editing, } = this.state;
    return (
      <div>
<Navbar />
      <Container>
        <Divider hidden />
        <br />
        <Grid>
          <Grid.Row>
            { editing ? this.editView() : this.profileView()}
            <Grid.Column>
              <Button circular inverted onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      </div>
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

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}