import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/auth/test');
  }

  return (
    <div>
        <h1 className="display-5 fw-bold text-center">Login</h1>
        <form onSubmit={loginUser}>
            <div className="container mt-4">
              <div className="form-group">
                <label htmlFor="email"><b>Email</b></label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email" 
                  name="email" 
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Password</b></label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter a password" 
                  name="password" 
                  value={data.password}
                  onChange={(e) => setData({...data, password: e.target.value})}
                  />
              </div>
              
              {/* <div className="form-group form-check">
                <input type="checkbox" id="rememberStatus" className="form-check-input" name="rememberStatus"/>
                <label className="form-check-label" for="rememberStatus">Remember Me</label>
              </div> */}

              <button type='submit'>Log in</button>

              <Link to="/Signup" className="mt-4 btn btn-primary">I don't have an account</Link>
            </div>
        </form>   
    </div>
  );
}

export default Login;