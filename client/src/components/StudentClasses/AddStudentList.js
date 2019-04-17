import React from "react";
import axios from "axios";
import { Grid, Form, Input, Header } from "semantic-ui-react";

class AddClass extends React.Component {
  state = { email: [], input: "", toogle: false };

  componentDidMount() {
    this.setState(...this.props.info);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, input } = this.state;
    axios
      .patch(`/api/student_lists/${this.props.id}`, { email: input })
      .then(res => this.setState({ email: [res.data, ...email], input: "" }));
  };

  render() {
    if (this.state.toogle) {
      return (
        <div>
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
              <label style={{ color: "#9219FF" }}>Enter Email Address</label>
              <Input
                style={{ inputStyle }}
                value={this.state.email}
                type="email"
                name="input"
                placeholder="Email"
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
    } else {
      return (
        <div>
          <Header>{}</Header>
          <button
            style={{
              color: "#9219FF",
              marginLeft: "53%",
              borderRadius: "10px"
            }}
            onClick={() => this.setState({ toogle: !this.state.toogle })}
          >
            Edit
          </button>
        </div>
      );
    }
  }
}
export default AddClass;

const inputStyle = {
  color: "#9219FF"
};
