import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgb(33, 158, 219);
  padding: 20px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-height: 64px;
  z-index: 8;

  a {
    color: white;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const Navigation = props => {
  return (
    <Nav>
      <Link to="/">Home</Link>
    </Nav>
  );
};

export default Navigation;
