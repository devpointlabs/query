import React from 'react';
import { Link, } from "react-router-dom";
import { Button, Header, } from "semantic-ui-react";
import { AuthConsumer, } from '../providers/AuthProvider'

const NoMatch = () => {
  document.body.style = 'background: #5906A3;'
  return (
    <AuthConsumer>
      {auth => (
        <div style={styles.container}>
          <Header as="h1" style={styles.header} inverted>Looking for something?</Header>
          <Header as="h2" inverted>This page does not exist..</Header>
          <div>
            { auth.authenticated ? 
              <Button inverted as={Link} to="/home" size="large">Your Dashboard</Button>
            :
              <Button.Group size="large">
                  <Button inverted as={Link} to="/login">Login</Button>
                  <Button inverted as={Link} to="/register">Register</Button>
              </Button.Group> }
          </div>
        </div>
      )}
    </AuthConsumer>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  header: {
    fontSize: "3em",
  },
};

export default NoMatch;


