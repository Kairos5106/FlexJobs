import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
        <div className="container bg-light">
          <h1 className="display-5 fw-bold text-center">Create an account</h1>
          <form action="">
            <div className="container mt-4">

              <div className="form-group">
                <label for="email"><b>Email</b></label>
                <input type="email" id="email" className="form-control" placeholder="Your Email" name="email" required/>
              </div>

              <div className="form-group">
                <label for="email"><b>Status</b></label>
                <input type="email" id="email" className="form-control" placeholder="Your Email" name="email" required/>
              </div>

              <div className="form-group">
                <label for="email"><b>Phone Number</b></label>
                <input type="email" id="email" className="form-control" placeholder="Your Email" name="email" required/>
              </div>

              <div className="form-group">
                <label for="password"><b>Password</b></label>
                <input type="password" id="password" className="form-control" placeholder="Your Password" name="password" required/>
              </div>

              <div className="form-group">
                <label for="password"><b>Confirm Password</b></label>
                <input type="password" id="password" className="form-control" placeholder="Your Password" name="password" required/>
              </div>

              <div className='form-group'>
                <label htmlFor="agreeTerms">
                  <input type="checkbox" id="agreeTerms" name="agreeTerms"/> 
                  I agree to the <strong>Terms and Conditions</strong> of FlexJobs
                </label>
              </div>

              <Link to="/Signup" className="mt-4 btn btn-primary">Register account</Link>
            </div>
          </form>      
        </div>
  );
}

export default Signup;