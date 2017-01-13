import React, { Component, PropTypes as T } from 'react'
import { Grid, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import AuthService from '../utils/AuthService'

class Navigation extends Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile })
    })
    this.onNavItemClick = this.onNavItemClick.bind(this)
  }

  onNavItemClick() {
    if(!this.props.auth.loggedIn()) {
      this.props.auth.login()
    } else {
      this.props.auth.logout()
      this.context.router.push('/login')
    }
  }

  render() {
    let isLoggedIn = this.props.auth.loggedIn()
    let authLink = (isLoggedIn ? 'Logout' : 'Login')
    let greeting = (isLoggedIn ? `Hello, ${this.state.profile.nickname}!` : '')
    let scriptsLink
    if (isLoggedIn) scriptsLink = (<NavItem eventKey={2} href="home">Scripts</NavItem>)
    return (
      <div>
        <Navbar inverse staticTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React Prompter</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="demo">Quick Entry</NavItem>
                {scriptsLink}
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} disabled>{greeting}</NavItem>
                <NavItem eventKey={2} onClick={this.onNavItemClick}>{authLink}</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        {this.props.children}
      </div>

    )
  }
}

export default Navigation
