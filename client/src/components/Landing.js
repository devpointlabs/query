import React from 'react'
import {Container, Header, Button, Grid} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { AuthConsumer, } from '../providers/AuthProvider';
import { useWindowWidth, } from '../hooks/useWindowWidth'

const Landing = () => {
  document.body.style = 'background: #6D55A3;'
  const width = useWindowWidth();
  return (
    <AuthConsumer>
      { auth => (
        <Container>
        <Header
          as='h1'
          content={width < 500 ? "Query" : "Welcome to Query"}
          inverted
          textAlign= 'center'
          style={width < 500 ? 
            {fontSize: '100px',
            fontWeight: 'normal',
            marginBottom: "25px",
            marginTop: '15px',} 
            : 
            {
            fontSize: '100px',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '15px',
          }}
        />
        { auth.authenticated ? 
        <div>
          <Header inverted as="h3" textAlign="center">You are signed in as {auth.user.email}</Header>
          <div style={{textAlign: "center"}}>
            <Button as={Link} to="/home" inverted >Your Dashboard</Button>
          </div>
            
        </div>
        : 
        <Grid>
          <Grid.Column textAlign="center">
            <Button.Group size="massive">
              <Button as={Link} inverted color="white" to="/login">Log in</Button>
              <Button.Or />
              <Button as={Link} inverted color="white" to="/register">Register</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
        }
        </Container>
      )}
    </AuthConsumer>
  )
}

export default Landing;

