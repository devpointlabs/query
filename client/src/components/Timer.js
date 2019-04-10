import React from "react";
import { Form, Message, Button, Header } from "semantic-ui-react";
import axios from "axios";

class Timer extends React.Component {
  
 state = {
   timed: "idk",
   clock: "",
   length: "",
   active: "",
   end: ""
    }

  componentDidMount() {
    axios.get(`/api/quizzes/${this.props.id}`).then(res => {
      this.setState({ active: res.data.active, end: res.data.end });
      if (this.state.end !== null && this.state.active === true) {
        this.setState({ timed: "y" });
      }
    });
    setInterval(this.timer, 1000);
  }

  static = () => {
    if (this.state.active === null || this.state.active === false) {
      axios
        .patch(`/api/quizzes/${this.props.id}`, { end: "", active: true })
        .then(res => {
          this.setState({ timed: "n", active: true, end: "" });
        });
    }
  };

  timer = () => {
    if (this.state.end !== "") {
      let time = ("" + Date.now()).split("");
      time.splice(0, time.count - 13);
      time = parseInt(time.join(""));
      let timer = parseInt(this.state.end) - time;
      let min = Math.floor((timer / 1000 / 60) << 0);
      let sec = Math.floor((timer / 1000) % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      let clock = `Time Remaining [${min}:${sec}]  `;
      if (timer <= 0) {
        axios
          .patch(`/api/quizzes/${this.props.id}`, { end: "", active: false })
          .then(res => {
            this.setState({
              lenght: null,
              active: res.data.active,
              end: res.data.end
            });
          });
      }
      this.setState({ clock: clock });
    }
  };

  stopTimer = () => {
    axios
      .patch(`/api/quizzes/${this.props.id}`, { end: "", active: false })
      .then(res => {
        this.setState({
          timed: "idk",
          lenght: null,
          active: res.data.active,
          end: res.data.end
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let endTime = ("" + Date.now()).split("");
    endTime.splice(0, endTime.count - 13);
    endTime = parseInt(endTime.join("")) + this.state.length * 60000;
    axios.patch(`/api/quizzes/${this.props.id}`, { end: endTime, active: true })
      .then(res => {
        this.setState({ active: res.data.active, end: res.data.end });
      });
  };

  render() {
    if (this.state.active) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Message style={{ width: "75%" }} negative>
            <Message.Header>
              <Header
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                THIS QUIZ IS CURRENTLY ACTIVE
              </Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.timed === "y" ? (
                  <Header as="h1">{this.state.clock}</Header>
                ) : null}{" "}
                <Button
                  size="tiny"
                  inverted
                  color="red"
                  onClick={() => this.stopTimer()}
                >
                  End
                </Button>
              </div>
            </Message.Header>
          </Message>
        </div>
      );
    } else {
      if (this.state.timed === "idk") {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
          
              <button style={buttonStyle} onClick={() => this.setState({ timed: "y" })}>
                Start Timed Quiz
              </button>
              <button style={buttonStyle} onClick={() => this.static()}>
                Start Static Quiz
              </button>
            
          </div>
        );
      }
      if (this.state.timed === "y") {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form style={{ width: "70%" }} onSubmit={this.handleSubmit}>
              <Form.Input
                autoFocus
                required
                type="number"
                placeholder="Minutes the Quiz will be Open"
                name="length"
                value={this.state.length}
                onChange={this.handleChange}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button style={buttonStyle}>Start Timed</button>
                <button style={buttonStyle}        
                  onClick={() => this.setState({ timed: "idk" })}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        );
      }
   }
  }
}

export default Timer;


const buttonStyle = {
  border: "1px solid",
  color: "purple"
};