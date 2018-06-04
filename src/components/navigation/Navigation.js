import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgb(33, 158, 219);
  padding: 20px;
  text-align: center;
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
