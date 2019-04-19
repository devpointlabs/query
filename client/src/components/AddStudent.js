import React from "react";
import { Button, Grid, Form, Input, List } from "semantic-ui-react";

class AddStudent extends React.Component {
  state = {
    user: {},
    email: "",
    showStudentForm: false,
    showButtons: true,
    pupil: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, pupil } = this.state;
    // axios.post("/api/add_student_to_quiz", {email: email})
    // .then(res => this.setState({user: res.data}))
    this.props.pmail(email);
    this.setState({ email: "" });
    this.setState({ pupil: [...pupil, email] });
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
    document.body.style = "background: #5906A3;";
    return (
      <div style={divStyle}>
        {this.state.showButtons ? (
          <Button style={buttonStyle} onClick={this.toggleStudentForm}>
            Add Student
          </Button>
        ) : null}
        {this.state.showStudentForm && (
          <>
            <div
              style={this.props.width < 500 ? { textAlign: "center" } : null}
            >
              <Form onSubmit={this.handleSubmit}>
                <Form.Field
                  style={
                    this.props.width < 500
                      ? null
                      : {
                          paddingTop: "1%",
                          marginLeft: "5%",
                          marginRight: "40%"
                        }
                  }
                >
                  <label style={{ color: "#5906A3" }}>
                    Enter Email Address
                  </label>
                  <Input
                    style={{ inputStyle }}
                    value={this.state.email}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Grid>
                  <Grid.Column>
                    <Button
                      style={{
                        border: "1px solid",
                        backgroundColor: "white",
                        color: "#9219FF",
                        marginLeft: "53%"
                      }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            </div>
          </>
        )}
        {this.state.showButtons ? null : (
          <Button
            style={{
              border: "1px solid",
              backgroundColor: "white",
              color: "red",
              marginLeft: "5%",
              marginTop: "3%"
            }}
            onClick={this.toggleButtons}
          >
            Cancel
          </Button>
        )}

        <List style={{ marginLeft: "5%", marginRight: "5%" }}>
          {this.state.pupil.map(p => (
            <div>
              <p>{p}</p>
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default AddStudent;

const divStyle = {
  desktop: {
    marginBottom: "50px",
    backgroundColor: "white",
    textAlign: "left",
    color: "#9219FF",
    marginLeft: "15%",
    marginRight: "15%",
    borderRadius: "10px",
    paddingBottom: "2%"
  },
  mobile: {
    marginBottom: "50px",
    backgroundColor: "white",
    textAlign: "left",
    color: "purple",
    borderRadius: "10px",
    paddingBottom: "2%"
  }
};

const buttonStyle = {
  backgroundColor: "white",
  marginLeft: "5%",
  marginRight: "2%",
  border: "1px solid",
  color: "#9219FF"
};

const inputStyle = {
  color: "#9219FF"
};
