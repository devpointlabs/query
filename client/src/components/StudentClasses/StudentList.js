import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import AddStudentList from "./AddStudentList";
import { Grid, Form, Input, Card, Container } from "semantic-ui-react";

class StudentList extends React.Component {
  state = { glasses: [], name: "New Class" };

  componentDidMount() {
    axios.get("/api/student_lists").then(res => {
      this.setState({ glasses: res.data });
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, glasses } = this.state;
    axios.post(`/api/student_lists`, { name: name }).then(res => {
      this.setState({ glasses: [res.data, ...glasses], name: "" });
    });
  };

  render() {
    document.body.style = "background: #5906A3";
    return (
      <div>
        <Navbar />
        <Container style={{ margin: "5px" }}>
          <Card.Group centered>
            {this.state.glasses.map(c => (
              <AddStudentList info={c} />
            ))}

            <Card>
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
                  <label style={{ color: "#9219FF" }}>Enter Class Name</label>
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
                      onClick={this.handleSubmit}
                      style={{
                        color: "#9219FF",
                        marginLeft: "50%",
                        borderRadius: "10px"
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </Grid.Column>
                </Grid>
              </Form>
            </Card>
          </Card.Group>
        </Container>
      </div>
    );
  }
}
export default StudentList;

const inputStyle = {
  color: "#9219FF"
};
