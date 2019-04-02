import React from 'react';
// import { AuthConsumer, } from '../providers/AuthProvider';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Dropdown, Container, Segment, } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';


class Navbar extends React.Component {

  render(){
    const { auth: {user, handleLoggin, handleLogout}, location} = this.props
    if(user){
    return(
    <div>
    {
      this.signedIn()
    }</div>)}
    else
      return(
        <div>{
        this.signedOut()
        }</div>)

  }



  signedIn(){
    const { auth: {handleLogout}, location} = this.props
    return(
  <Dropdown icon={<img alt='logo' width="100" height="100"  src='https://imgur.com/TRzM7lf.png' />}>
  <Dropdown.Menu>
    <Dropdown.Item text='Logout' onClick={ () => handleLogout(this.props.history)} />
  </Dropdown.Menu>
</Dropdown>
    )}

  signedOut(){
    const { auth: {handleLoggin}, location} = this.props
    return(
  <Dropdown icon={<img alt='logo' width="100" height="100" src='https://imgur.com/TRzM7lf.png'/>}>
  <Dropdown.Menu>
    <Dropdown.Item href={`/register`} text='Register'>
    </Dropdown.Item>
    <Dropdown.Item text='Login' href={`/login`}/>
  </Dropdown.Menu>
</Dropdown>
    )}
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);