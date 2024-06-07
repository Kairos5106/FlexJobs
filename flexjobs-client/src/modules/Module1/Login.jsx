import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
        <form action="">
            <div className="container mt-4">
              <div className="form-group">
                <label for="email"><b>Email</b></label>
                <input type="email" id="email" className="form-control" placeholder="Your Email" name="email" required/>
              </div>
              <div className="form-group">
                <label for="password"><b>Password</b></label>
                <input type="password" id="password" className="form-control" placeholder="Your Password" name="password" required/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" id="rememberStatus" className="form-check-input" name="rememberStatus"/>
                <label className="form-check-label" for="rememberStatus">Remember Me</label>
              </div>
              <button>Log in</button>

              <Link to="/Signup" className="mt-4 btn btn-primary">I don't have an account</Link>
            </div>
        </form>   
    </div>
  );
}

export default Login;