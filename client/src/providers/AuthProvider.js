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
        history.push("/home");
      })
      .catch( err => {
        console.log(err);
        alert("Please Double Check Your Work.\nSomething's not right here")
      })
  }
  handleLogin = (user, history) => {
    axios.post("/api/auth/sign_in", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/home");
      })
      .catch( err => {
        console.log(err);
        alert("Wrong Login.\nSomething here's not right")
      })
  }
  handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
      .then( res => {
        this.setState({ user: null, });
        history.push('/login');
      })
      .catch( err => {
        console.log(err);
        alert("You Are Still Logged In.\nTry again!")
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
        setUser: (user) => this.setState({ user, }),
        // is_teacher: this.state.user.teacher,
      }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}