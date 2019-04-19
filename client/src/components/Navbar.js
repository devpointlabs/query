import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Dropdown, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  proImg() {}
  // for mobile responsiveness
  state = { width: 0, height: 0}

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  // ====


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
                      ? "https://imgur.com/6qiAjc4.png"
                      : this.props.auth.user.image
                  }
                />
              }
            >
              <Dropdown.Menu style={{marginTop:"-35px", marginLeft: "-35px"}}>
                <Dropdown.Item text="Profile" as={Link} to="/Profile" />
                <Dropdown.Item
                  text="Logout"
                  onClick={() => handleLogout(this.props.history)}
                />
                { this.props.auth.user.teacher && <Dropdown.Item text="Results" as={Link} to="/ResultsByQuiz" />}
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
              style={ this.state.width < 500 ? 
                { fontSize: "75px", marginTop: "25px", color: "#fff", marginBottom: "-25px" } :
                { fontSize: "75px", marginTop: "25px", color: "#fff"}
              }
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
                      ? "https://imgur.com/6qiAjc4.png"
                      : this.props.auth.user.image
                  }
                />
              }
            >
              <Dropdown.Menu style={{marginTop:"-35px", marginLeft: "-30px"}}>
                <Dropdown.Item text="Profile" as={Link} to="/Profile" />
                <Dropdown.Item
                  text="Logout"
                  onClick={() => handleLogout(this.props.history)}
                />
                { this.props.auth.user.teacher && <Dropdown.Item text="Results" as={Link} to="/Results" />}
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
