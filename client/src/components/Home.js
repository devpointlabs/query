import React from  'react';
import { AuthConsumer, } from '../providers/AuthProvider'
import { Button } from 'semantic-ui-react';
const Home = (props) => {
  document.body.style = 'background: #6D55A3;'

  return (
    <AuthConsumer>
      { auth => (
        <div>{auth.authenticated ? 
          <div>
            <h1>Welcome, {auth.user.name}</h1> 
            {auth.user.teacher ? <Button inverted>Create a Quiz</Button> : <Button inverted>See Your Quizzes</Button>}
            <Button onClick={() => auth.handleLogout(props.history)} inverted>Logout</Button>
          </div>
          : 
          <h1>Please login or create an account</h1>
          }
        </div>
      )}


    </AuthConsumer>
  )
}
export default Home;