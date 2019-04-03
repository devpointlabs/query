import React from  'react';
import { AuthConsumer, } from '../providers/AuthProvider'
import { Header, } from 'semantic-ui-react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
const Home = (props) => {
  document.body.style = 'background: #6D55A3;'

  return (
    <AuthConsumer>
      { auth => (
        <div>{auth.authenticated ? 
          <div>
           <Header style={{color: "#fff", fontSize: "75px", textAlign: "center",}}>Welcome, {auth.user.name}</Header>
            {auth.user.teacher ? 
              <TeacherDashboard /> 
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