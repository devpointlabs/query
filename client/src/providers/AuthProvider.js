import React from 'react';
import axios from 'axios';

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;


export class AuthProvider extends React.Component {
  state = { user: null, }
  handleRegister = (user, history) => {
    axios.post("/api/auth", user)
      .then( res => {
        this.setState({ user: res.data.data, })
        history.push("/");
      })
      .catch( err => {
        console.log(err);
      })
  }
  handleLogin = (user, history) => {
    axios.post("/api/auth/sign_in", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/");
      })
      .catch( res => {
        console.log(res);
      })
  }
  handleLogout = (history) => {
    debugger
    axios.delete("/api/auth/sign_out")
      .then( res => {
        this.setState({ user: null, });
        history.push("/");
      })
      .catch( res => {
        console.log(res);
      })
  }
  render() {
    return (
      <AuthContext.Provider value = {{
        ...this.state,
        authenticated: this.state.user !== null,
        handleRegister: this.handleRegister,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
        setUser: (user) => this.setState({ user, })
      }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}