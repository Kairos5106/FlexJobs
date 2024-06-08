import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    identity: '',
    phoneNo: '',
    password: '',
  });
  
  const registerUser = (e) => {
    e.preventDefault();
  }

  return (
        <div className="container bg-light">
          <h1 className="display-5 fw-bold text-center">Create an account</h1>
          <form onSubmit={registerUser}>
            <div className="container mt-4">

              <div className="form-group">
                <label htmlFor="name"><b>Name</b></label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your name" 
                  name="name" 
                  value={data.name}
                  onChange={(e) => setEmail({...data, name: e.target.value})}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="email"><b>Email</b></label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email" 
                  name="email" 
                  value={data.email}
                  onChange={(e) => setEmail({...data, email: e.target.value})}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="identity"><b>Identity</b></label>
                <select 
                  className="form-control" 
                  name="identity" 
                  value={data.identity}
                  onChange={(e) => setEmail({...data, identity: e.target.value})}
                >
                  <option value="">Who are you?</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNo"><b>Phone Number</b></label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="Your phone number" 
                  name="phoneNo" 
                  value={data.phoneNo}
                  onChange={(e) => setEmail({...data, phoneNo: e.target.value})}
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
                  onChange={(e) => setEmail({...data, password: e.target.value})}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm"><b>Confirm Password</b></label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirm your password" 
                  name="passwordConfirm" 
                  value={data.passwordConfirm}
                  onChange={(e) => setEmail({...data, passwordConfirm: e.target.value})}
                  />
              </div>

              <div className='form-group'>
                <label htmlFor="agreeTerms">
                  <input type="checkbox" id="agreeTerms" name="agreeTerms"/>
                  I agree to the <strong>Terms and Conditions</strong> of FlexJobs
                </label>
              </div>

              <button type="submit" className="mt-4 btn btn-primary">Register account</button>

            </div>
          </form>      
        </div>
  );
}

export default Signup;