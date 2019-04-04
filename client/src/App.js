import React from 'react';
import Navbar from './components/Navbar'
// import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import NoMatch from './components/NoMatch'
import FetchUser from './components/FetchUser'
import Profile from './components/Profile'
import Home from './components/Home'
import ShowQuiz from './components/ShowQuiz'
import { Container, } from 'semantic-ui-react';
import { Route, Switch, } from 'react-router-dom';
// import Profile from './components/Profile'

const App = () => (
  <>
    <Navbar/>
      <FetchUser>
        <Container>
          <Switch>
           <Route exact path="/" component={Landing} />
           <Route exact path="/home" component={Home} />
           <Route exact path="/profile" component={Profile} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/register" component={Register} />
           <Route exact path="/quizzes/:id" component={ShowQuiz} />
           <Route component={NoMatch} />
          </Switch>
        </Container>
      </FetchUser>
  </>
)

export default App;
