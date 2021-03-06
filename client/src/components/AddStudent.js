import React from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Form,
  Input,
  Dropdown,
  List,
  Popup
} from "semantic-ui-react";

class AddStudent extends React.Component {
  state = {
    user: {},
    email: "",
    showStudentForm: false,
    showButtons: true,
    pupil: [],
    toogle: false,
    clarr: []
  };

  componentDidMount() {
    axios.get("/api/student_lists").then(res => {
      this.setState({ clarr: res.data });
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, pupil } = this.state;
    let amail = [email.toLowerCase().replace(/\s/g, "").replace(/,\s*$/, "")];
    this.props.pmail(amail);
    this.setState({ email: "", pupil: [...pupil, email] });
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

  Cladd = s => {
    if (s === null) {
      alert("There's No Students in this Class");
    } else {
      let email = s
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/,\s*$/, "")
        .split(",")
      this.props.pmail(email);
      this.setState({ pupil: [...email, ...this.state.pupil], email: "" });
    }
  };

  selClass = () => {
    return (
      <Dropdown style={{ marginLeft: "5%", border: "2px" }} text="Add By Class">
        <Dropdown.Menu>
          {this.state.clarr.map(c => (
            <Dropdown.Item onClick={() => this.Cladd(c.email)} text={c.name} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  render() {
    document.body.style = "background: #5906A3;";
    if(this.props.active){
return(
  <h1 style={{color: "red", marginLeft: "25%", marginBottom: "0", marginTop: "0",}}>Can't add students while query is active </h1>
)
    }
    else{
    return (
      <div style={divStyle}>
        {this.state.showButtons ? (
          <Button style={buttonStyle} onClick={this.toggleStudentForm}>
            View Students
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
                  <label style={{ color: "#9219FF" }}>
                    Add New Student by Email
                  </label>
                  <Input
                    style={{ inputStyle }}
                    value={this.state.email.toLowerCase()}
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Grid>
                  <Grid.Column style={{ display: "flex" }}>
                    {this.selClass()}
                    <button
                      style={{
                        color: "#9219FF",
                        marginLeft: "38%",
                        borderRadius: "10px"
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </Grid.Column>
                </Grid>
              </Form>
              <List style={{ marginLeft: "5%", marginRight: "5%" }}>
                { this.props.submail.map(p => (
                  <div key={Math.random * 1000}>
                    <Popup
                      trigger={<p style={{cursor: "pointer"}} onClick={() => this.props.delete(p)}>{p}</p>}
                      content={`Click to remove ${p}`}
                    />
                  </div>
                ))}
              </List>
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
            Close
          </Button>
        )}
      </div>
    )};
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
