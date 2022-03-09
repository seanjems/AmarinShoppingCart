import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="dark" expand="sm" className="text-decoration-none">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav align text-white"
          className="bg-white justify-content-end m-2"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="text-decoration-none">
          <Nav>
            <NavLink
              className="d-inline p-2 bg-dark text-white text-decoration-none "
              to="/">
              Home
            </NavLink>

            <NavLink
              className="d-inline p-2 bg-dark text-white text-decoration-none"
              to="/categories">
              Categories
            </NavLink>

            <NavLink
              className="d-inline p-2 bg-dark text-white text-decoration-none"
              to="/suppliers">
              Suppliers
            </NavLink>

            <NavLink
              className="d-inline p-2 bg-dark text-white text-decoration-none"
              to="/products">
              Products
            </NavLink>
            <NavLink
              className="d-inline p-2 bg-dark text-white text-decoration-none"
              to="/pages">
              Pages
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
