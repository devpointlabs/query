import React from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import NoMatch from './components/NoMatch'
import FetchUser from './components/FetchUser'
import ProtectedRoute from "./components/ProtectedRoute";
import { Container, } from 'semantic-ui-react';
import { Route, Switch, } from 'react-router-dom';

const App = () => (
  <>
    <Navbar/>
      <FetchUser>
        <Container>
          <Switch>
           <Route exact path="/" component={Landing} />
           <ProtectedRoute exact path="/home" component={Home} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/register" component={Register} />
           <Route exact path="/register/teacher" component={Register} />
           <Route component={NoMatch} />
          </Switch>
          </Container>
      </FetchUser>
  </>
)

export default App;