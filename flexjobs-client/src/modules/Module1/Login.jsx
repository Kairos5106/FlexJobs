import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Information obtained from form");
    axios.post('http://localhost:3000/auth/login', { email, password })
    .then(result => {
      console.log(result)
      if(result.data === "Success"){
        navigate('/');
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
        <h1 className="display-5 fw-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="container mt-4">
              <div className="form-group">
                <label htmlFor="email"><b>Email</b></label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email" 
                  name="email" 
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Password</b></label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter a password" 
                  name="password" 
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              
              {/* <div className="form-group form-check">
                <input type="checkbox" id="rememberStatus" className="form-check-input" name="rememberStatus"/>
                <label className="form-check-label" for="rememberStatus">Remember Me</label>
              </div> */}

              <button>Log in</button>

              <Link to="/Signup" className="mt-4 btn btn-primary">I don't have an account</Link>
            </div>
        </form>   
    </div>
  );
}

export default Login;