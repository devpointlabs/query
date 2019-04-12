import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Dropdown, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  proImg() {}

  render() {
    const {
      auth: { user }
    } = this.props;
    if (user) {
      return <div style={{ margin: "5px" }}>{this.signedIn()}</div>;
    } else return <div style={{ margin: "5px" }}>{this.signedOut()}</div>;
  }

  signedIn() {
    const {
      auth: { handleLogout }
    } = this.props;
    if (this.props.location.pathname === "/home") {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <img
              alt="logo"
              width="100"
              height="100"
              src="https://imgur.com/TRzM7lf.png"
            />
          </div>
          <div
            style={{
              width: "49%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Dropdown
              icon={
                <img
                  alt="logo"
                  width="50"
                  height="50"
                  style={{ marginTop: "5px" }}
                  src={
                    this.props.auth.user.image === null
                      ? "http://chittagongit.com//images/profile-pic-icon/profile-pic-icon-16.jpg"
                      : this.props.auth.user.image
                  }
                />
              }
            >
              <Dropdown.Menu style={{marginTop:"-35px", marginLeft: "-15px"}}>
                <Dropdown.Item text="Profile" as={Link} to="/Profile" />
                <Dropdown.Item
                  text="Logout"
                  onClick={() => handleLogout(this.props.history)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      );
    } else if (
      this.props.location.pathname == 
      `/quizbuilder/${this.props.location.pathname.split("/").pop()}` 
      ||
      '/profile'
      ||
      `/quizzes/${this.props.location.pathname.split("/").pop()}` 
    ) {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <Icon
              name="arrow left"
              onClick={() => this.props.history.push("/home")}
              style={{ fontSize: "75px", marginTop: "25px", color: "#fff" }}
            />
          </div>
          <div
            style={{
              width: "49%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Dropdown
              style={{ marginTop: "5px" }}
              icon={
                <img
                  alt="logo"
                  width="50"
                  height="50"
                  src={
                    this.props.auth.user.image === null
                      ? "http://chittagongit.com//images/profile-pic-icon/profile-pic-icon-16.jpg"
                      : this.props.auth.user.image
                  }
                />
              }
            >
              <Dropdown.Menu style={{marginTop:"-35px", marginLeft: "-15px"}}>
                <Dropdown.Item text="Profile" as={Link} to="/Profile" />
                <Dropdown.Item
                  text="Logout"
                  onClick={() => handleLogout(this.props.history)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      );
    }
  }

  signedOut() {
    return (
      <Dropdown
        icon={
          <img
            alt="logo"
            width="100"
            height="100"
            src="https://imgur.com/TRzM7lf.png"
          />
        }
      >
        <Dropdown.Menu>
          <Dropdown.Item href={`/register`} text="Register" />
          <Dropdown.Item text="Login" href={`/login`} />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Navbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedNavbar);
