import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }
  
  return (
    <div><ul className="nav-ul">
      <li>
        <Link to="/">Prducts</Link>
        <Link to="/add">Add Prducts</Link>
        <Link to="/update">Update Prducts</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        {auth ? <Link to="/signup" onClick={logout}>Logout {JSON.parse(auth).name}</Link> :
          <Link to="/signup">Signup</Link>}
      </li>
    </ul></div>
  )
}

export default Nav;