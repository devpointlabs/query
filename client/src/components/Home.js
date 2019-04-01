import React from  'react';
import { AuthConsumer, } from '../providers/AuthProvider'
import { Button } from 'semantic-ui-react';
const Home = (props) => (
  <AuthConsumer>
    { auth => (
      <div>{auth.authenticated ? 
      <div>
        <h1>Welcome</h1> 
        <Button onClick={() => auth.handleLogout(props.history)}>Logout</Button>
      </div>
      : 
      <h1>Please login or create an account</h1>
      }</div>
    )}


  </AuthConsumer>
)
export default Home;