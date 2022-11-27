import React from "react";
// Bootstrap UI Components
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// React Redux
import { useDispatch, useSelector } from "react-redux";
// Redux User Actions
import { logout } from "../actions/userActions";
import Authorization from "../hook/Authorization";
import { RolesEnums } from "../routes/ProtectedRoute";
import history from "../utils/history";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  const handerChangeAdmin = () => {
    history.push("/admin");
  };

  return (
    <div>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>React E-Commerce</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fa fa-shopping-cart mr-2"></i>
                    Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <Authorization
                      roles={[RolesEnums.get("ADMIN")]}
                      type="ifAnyGranted"
                    >
                      <NavDropdown.Item onClick={handerChangeAdmin}>
                        Admin
                      </NavDropdown.Item>
                    </Authorization>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fa fa-user mr-2"></i>
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
