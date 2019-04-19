import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null };
  handleRegister = (user, history) => {
    axios
      .post("/api/auth", user)
      .then(res => {
        this.setState({ user: res.data.data });
        history.push("/home");
      })
      .catch(err => {
        alert("Please Double Check Your Work.\nSomething's not right here");
      });
  };
  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user)
      .then(res => {
        this.setState({ user: res.data.data });
        history.push("/home");
      })
      .catch(err => {
        alert("Wrong Login\nTry Again!");
      });
  };
  handleLogout = history => {
    axios
      .delete("/api/auth/sign_out")
      .then(res => {
        this.setState({ user: null });
      })
      .catch(err => {
        console.log(err);
        document.location.reload();
      });
    history.push("/");
  };

  updateUser = (id, user) => {
    let data = new FormData();
    data.append("file", user.file);
    axios
      .put(`/api/users/${id}?name=${user.name}&email=${user.email}`, data)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          handleRegister: this.handleRegister,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          setUser: user => this.setState({ user }),
          updateUser: this.updateUser
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
