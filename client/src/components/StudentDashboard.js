import React from 'react';
import { Header, Button } from 'semantic-ui-react';
// import TeacherQuizzes from './TeacherQuizzes'

class StudentDashboard extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }
  
    render() {
      return (
        <div style={{textAlign: "center"}}>
            <Header as="h2" inverted>Your quizzes</Header>
            {/* <TeacherQuizzes /> */}
            <Header as="h2" inverted>Your results</Header>
            <br/>
            <Button inverted>Give Your Teacher an Apple</Button>
          </div>
      )
    }
  }
export default StudentDashboard;