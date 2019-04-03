import React from 'react'
import {Container, Header, Button, Grid} from 'semantic-ui-react'
import { Link } from "react-router-dom";

const Landing = () => {
  document.body.style = 'background: #6D55A3;'
  return (
    <Container>
    <Header
      as='h1'
      content='Welcome to Query'
      inverted
      textAlign= 'center'
      style={{
        fontSize: '100px',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '15px',
      }}
    />
        <Grid>
          <Grid.Column textAlign="center">
            <Button.Group size="massive">
              <Button as={Link} inverted color="white" to="/login">Log in</Button>
              <Button.Or />
              <Button as={Link} inverted color="white" to="/register">Register</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
    </Container>
  )
}

export default Landing
