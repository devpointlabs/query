import React from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Form,
  Input
} from "semantic-ui-react";

class AddStudent extends React.Component {
  state = {
    user: {},
    email: "",
    showStudentForm: false,
    showButtons: true,
    pupil: [],
  };

  handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state
    // axios.post("/api/add_student_to_quiz", {email: email})
    // .then(res => this.setState({user: res.data}))
    this.props.pmail(email)
    this.setState({email: ""})
  };

  toggleStudentForm = () =>
    this.setState({
      showStudentForm: !this.state.showStudentForm,
      showButtons: false
    });

  toggleButtons = () =>
    this.setState({
      showButtons: true,
      showStudentForm: false
    });

  render() {
    document.body.style = "background: #6D55A3;";
    return (
      <div style={divStyle}>
      {this.state.showButtons ? (
  <div style={{display: "flex", justifyContent: "flex-start"}}>
    <Button style={buttonStyle} onClick={this.toggleStudentForm}>
      Add Student
    </Button>
  </div>
) : null}

{this.state.showStudentForm && (
  <div style={this.props.width < 500 ? { textAlign: "center"} : null}>
    <Form onSubmit={this.handleSubmit} >
      <Form.Field
        style={ this.props.width < 500 ? 
          null 
          :
          {
          paddingTop: "5%",
          marginLeft: "-14%",
          marginRight: "40%"
          }}
            >
          <label style={{ color: "purple" }}>Enter Email Address</label>
            <Input style={{ inputStyle }} 
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            />
      </Form.Field>
        <Grid>
          <Grid.Column textAlign={this.props.width < 500 ? "center" : "right"}>
            <Button circular inverted color="purple" size={this.props.width < 500 ? "small" : "big"} type="submit">
              Submit
            </Button>
          </Grid.Column>
        </Grid>
    </Form>
  </div>
)}
{this.state.showButtons ? null : (
  <div style={this.props.width < 500 ? {textAlign: "center"} : null}>
  <Button onClick={this.toggleButtons}>Cancel</Button>
  </div>
)}
    </div>
    );
  }
}
export default AddStudent;

const divStyle = {
  marginBottom: "50px",
  backgroundColor: "white",
  textAlign: "left",
  color: "purple",
  marginLeft: "15%",
  marginRight: "15%",
  borderRadius: "10px",
  paddingBottom: "2%"
};

const buttonStyle = {
  backgroundColor: "white",
  marginLeft: "-14%",
  marginRight: "2%",
  border: "1px solid",
  color: "purple"
};

const inputStyle = {
  color: "purple"
};
