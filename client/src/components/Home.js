import React from  'react';
import { AuthConsumer, } from '../providers/AuthProvider'
import { Header, } from 'semantic-ui-react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
const Home = (props) => {
  document.body.style = 'background: #5906A3;'

  return (
    <AuthConsumer>
      { auth => (
        <div>{auth.authenticated ? 
          <div>
            {auth.user.teacher ? 
              <TeacherDashboard user={auth.user}/> 
            : 
              <StudentDashboard/>}
            {/* <Button onClick={() => auth.handleLogout(props.history)} inverted>Logout</Button> */}
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