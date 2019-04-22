import React from "react";
import axios from "axios";
import {
  Grid,
  Form,
  Input,
  Header,
  Card,
  Icon,
  Button,
  Container
} from "semantic-ui-react";

class AddClass extends React.Component {
  state = { zmail: [], input: "", toogle: false };

  componentDidMount() {
    this.setState({
      ...this.props.info,
      zmail: this.props.info.email ? this.props.info.email.split(",") : []
    });
  }

  removed = () => {
    const conf = window.confirm("are you sure")
    if (conf === true)
    {axios.delete(`/api/student_lists/${this.state.id}`)
    document.location.reload(true)}
  };

  delete = m => {
    let { zmail, id } = this.state;
    let arr = zmail.slice(0);
    let idx = arr.indexOf(m);
    arr.splice(idx, 1);
    axios.patch(`/api/student_lists/${id}`, { email: arr.join() }).then(res => {
      this.setState({ zmail: res.data.email.split(",") });
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { zmail, input } = this.state;
    let x = input.toLowerCase().replace(/\s/g, "").replace(/,\s*$/, "");
    let z = [x, ...zmail].join();
    axios
      .patch(`/api/student_lists/${this.state.id}`, { email: z })
      .then(res => {
        this.setState({ zmail: res.data.email.split(","), input: "" });
      });
  };

  render() {
    if (this.state.toogle) {
      return (
        <div
        // style={{
        //   width: "100%",

        //   backgroundColor: "#fff",
        //   borderRadius: "5px"
        // }}
        >
          <Card style={{ paddingBottom: "5px", marginBottom: "10px" }} fluid>
            <Form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
              <Form.Field
                style={
                  this.props.width < 500
                    ? null
                    : {
                        width: "100%"
                      }
                }
              >
                <Header>
                  {this.state.name}
                  <Button
                    style={{ marginTop: "3px", float: "right" }}
                    inverted
                    color="red"
                    size="mini"
                    onClick={() => this.removed()}
                  >
                    <Icon name="trash alternate" />
                  </Button>
                </Header>
                <Input
                  required
                  style={{ inputStyle }}
                  value={this.state.input.toLowerCase()}
                  name="input"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
            {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
            <br />
            <Button.Group>
              <Button
                inverted
                onClick={this.handleSubmit}
                style={{
                  // color: "#9219FF",
                  backgroundColor: "#9219ff",
                  // paddingLeft: "30%",
                  borderRadius: "10px"
                }}
                type="submit"
              >
                Submit
              </Button>
              <Button.Or />
              <Button
                inverted
                onClick={() => this.setState({ toogle: false })}
                style={{
                  backgroundColor: "#9219ff",
                  // paddingLeft: "30%",
                  borderRadius: "10px"
                }}
              >
                Cancel
              </Button>
            </Button.Group>

            {/* </Container> */}
            {/* </div> */}
            <Container style={{ marginTop: "10px" }}>
              <Card.Group centered>
                {this.state.zmail.map((z, i) => {
                  return (
                    <Card key={i}>
                      <Card.Header style={{ marginLeft: "3px" }}>
                        {z}
                        <Button
                          style={{ float: "right" }}
                          inverted
                          color="red"
                          size="mini"
                          onClick={() => this.delete(z)}
                        >
                          <Icon name="trash alternate" />
                        </Button>
                      </Card.Header>
                    </Card>
                  );
                })}
              </Card.Group>
            </Container>
          </Card>
        </div>
      );
    } else {
      return (
        <Card
          link
          onClick={() => this.setState({ toogle: !this.state.toogle })}
          style={{ paddingBottom: "75px" }}
        >
          <div>
            <Header style={{ marginLeft: "3px" }}>
              {this.props.info.name}
            </Header>
          </div>
        </Card>
      );
    }
  }
}
export default AddClass;

const inputStyle = {
  color: "#9219FF",
  width: "100%"
};
