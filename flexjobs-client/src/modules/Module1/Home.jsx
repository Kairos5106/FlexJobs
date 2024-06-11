import React from 'react'

const Home = () => {
    return (
        <div>
            {/* Hero section */}
            <section>
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className='col-12 col-lg-6'>
                    <h1 className='display-4 fw-bold align-items-center'>FlexJobs</h1>
                    <p className='lead text-center'>Where <span className='text-primary'>Talent</span> Meets Opportunity</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Homepage description */}
            <section className="homepage-description" id="homepage-description">
              <div className="container">
                <div className="section-description-center">
                  <h2>About This Site</h2>
                  <p>
                    At FlexJobs, we believe in empowering both freelancers and employers by providing a dynamic platform where talent meets opportunity. Our comprehensive job postings cater to a diverse range of industries and skill sets, ensuring that freelancers find meaningful work that aligns with their expertise and passions.
                    <br /><br />
                    With our integrated messaging system, FlexJobs facilitates seamless communication between freelancers and employers. Whether it's discussing project details, clarifying requirements, or negotiating terms, our platform ensures efficient collaboration every step of the way.
                    <br /><br />
                    Say goodbye to the hassle of payment processing and invoicing. FlexJobs simplifies the financial aspect of freelancing by offering secure payment solutions and automated invoicing features. Freelancers can focus on their work, knowing that they'll receive timely compensation for their efforts.
                    <br /><br />
                    Your profile on FlexJobs is more than just a resume – it's your professional identity. Showcase your skills, portfolio, and experience to stand out to potential clients. Additionally, our vibrant forum feature fosters community engagement, allowing freelancers to share insights, seek advice, and connect with like-minded individuals in their field.
                  </p>
                </div>
              </div>
            </section>
        </div>
    );
}

export default Home