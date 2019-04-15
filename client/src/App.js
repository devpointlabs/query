import React from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import NoMatch from './components/NoMatch'
import FetchUser from './components/FetchUser'
import Profile from './components/Profile'
import ShowQuiz from './components/ShowQuiz'
import TakeQuiz from './components/TakeQuiz'
import Results from './components/results/Results'
import { Container, } from 'semantic-ui-react';
import { Route, Switch, } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute"

import StudentQuizGraded from "./components/StudentQuizGraded"


const App = () => (
  <>
      <FetchUser>
        {/* <Container> */}
          <Switch>
           <Route exact path="/" component={Landing} />
           <ProtectedRoute exact path="/home" component={Home} />
           <Route exact path="/login" component={Login} />
           <ProtectedRoute exact path="/profile" component={Profile} />
           <ProtectedRoute exact path="/results" component={Results} />
           <Route exact path="/quizzes/:id/quiz" component={TakeQuiz} />
           <Route exact path="/register" component={Register} />
           <Route exact path="/register/teacher" component={Register} />
           <Route exact path="/quizbuilder/:id" component={ShowQuiz} />
           <Route exact path="/graded/" component={StudentQuizGraded} />
           <Route component={NoMatch} />
          </Switch>
        {/* </Container> */}
      </FetchUser>
  </>
)

export default App;
