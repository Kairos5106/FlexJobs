import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [status, setStatus] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [password, setPassword] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('', {name, email, status, phoneNo, password, passwordConfirm})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  return (
        <div className="container bg-light">
          <h1 className="display-5 fw-bold text-center">Create an account</h1>
          <form onSubmit={handleSubmit}>
            <div className="container mt-4">

              <div className="form-group">
                <label htmlFor="name"><b>Name</b></label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your name" 
                  name="name" 
                  required
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>

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
                <label htmlFor="status"><b>Status</b></label>
                <select 
                  className="form-control" 
                  name="status" 
                  required
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Who are you?</option>
                  <option value="student">Freelancer</option>
                  <option value="professional">Employer</option>
                </select>
              </div>

              {/* Needs to be modified for phone number */}
              <div className="form-group">
                <label htmlFor="phoneNo"><b>Phone Number</b></label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="Your phone number" 
                  name="phoneNo" 
                  required
                  onChange={(e) => setPhoneNo(e.target.value)}
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

              <div className="form-group">
                <label htmlFor="passwordConfirm"><b>Confirm Password</b></label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirm your password" 
                  name="passwordConfirm" 
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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