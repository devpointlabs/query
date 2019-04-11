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
    <Button style={buttonStyle} onClick={this.toggleStudentForm}>
      Add Student
    </Button>
) : null}

{this.state.showStudentForm && (
  <>
  <Form onSubmit={this.handleSubmit}>
    <Form.Field
      style={{
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
          <Button circular inverted color="purple" size="big" type="submit"
          style={{
            display: "flex",
            marginLeft: "73%",
            marginTop: "2%",
          }}>
            Submit
          </Button>
        </Form.Field>
  </Form>
  </>
)}
{this.state.showButtons ? null : (
  <Button onClick={this.toggleButtons}>Cancel</Button>
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
