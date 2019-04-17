import React from "react";
import axios from "axios";
import AddStudentList from "./AddStudentList";
import { Grid, Form, Input } from "semantic-ui-react";

class StudentList extends React.Component {
  state = { classes: [], name: "New Class" };

  componentDidMount() {
    axios.get("/api/student_lists").then(res => {
      debugger;
      this.setState({ classes: [res.data] });
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, classes } = this.state;
    axios
      .post(`/api/student_lists`, { name: name })
      .then(res =>
        this.setState({ classes: [res.data, ...classes], name: "" })
      );
  };

  render() {
    return (
      <div>
        <div>
          {this.state.classes.map(c => (
            <AddStudentList info={c} />
          ))}
        </div>
        <Form>
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
            <label style={{ color: "#9219FF" }}>Enter Email Address</label>
            <Input
              style={{ inputStyle }}
              value={this.state.email}
              type="name"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Grid>
            <Grid.Column>
              <button
                style={{
                  color: "#9219FF",
                  marginLeft: "53%",
                  borderRadius: "10px"
                }}
                type="submit"
              >
                Submit
              </button>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    );
  }
}
export default StudentList;

const inputStyle = {
  color: "#9219FF"
};
