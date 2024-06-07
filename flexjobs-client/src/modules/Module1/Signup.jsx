import React from 'react'

const Signup = () => {
  return (
        <div className="container bg-light text-md-left p-4 my-5 rounded-3 col-lg-6">
          <h1 className="display-5 fw-bold text-center">Create an account</h1>
          <form action="signup.php" method="post">
            <div className="container mt-4">
              <label htmlFor="email"><b>Email</b></label>
              <input type="email" id="email" placeholder="Your Email" name="email" required/>
              
              <label htmlFor="password"><b>Password</b></label>
              <input type="password" id="password" placeholder="Your Password" name="password" required/>
              
              <label htmlFor="passwordConfirm"><b>Confirm Password</b></label>
              <input type="password" id="passwordConfirm" placeholder="Enter your password again" name="passwordConfirm" required/>
              
              <label htmlFor="agreeTerms">
                <input type="checkbox" id="agreeTerms" name="agreeTerms"/> 
                I agree to the <strong>Terms and Conditions</strong> of FlexJobs
              </label>
              
              <button type="submit" className="mt-4 btn-primary">Continue registration</button>
            </div>
          </form>      
        </div>
  );
}

export default Signup;