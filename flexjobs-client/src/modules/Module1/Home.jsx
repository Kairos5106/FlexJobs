import React from 'react'

const Home = () => {
    return (
        <div>
            <div id="landing-page">
            <h2 id="homepage-title">Where Talent Meets Opportunity</h2>
            <a href="#homepage-description" className="big-button" id="learn-more">Explore</a>
            </div>

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

            {/* Feature overview */}
            <section className="feature-overview alternate-section" id="feature-overview">
              <div className="container">
                <ul className="cards flex">
                  <li className="card" id="feature-jobs">
                    <h2>CONNECT</h2>
                    <p>Post jobs as a client or find opportunities as a freelancer across diverse industries. Collaboration made easy for mutual success.</p>
                    <a href="module2/post-a-job.html" className="normal-button">Go to Jobs</a>
                  </li>
                  <li className="card" id="feature-forum">
                    <h2>DISCUSS</h2>
                    <p>Engage in vibrant discussions, seek advice, and connect with fellow freelancers and employers in our dynamic forum.</p>
                    <a href="module6/forumMain.html" className="normal-button">Go to Forum</a>
                  </li>
                  <li className="card" id="feature-inbox">
                    <h2>COMMUNICATE</h2>
                    <p>Streamline your communication process with our intuitive messaging system.</p>
                    <a href="module3/inbox.html" className="normal-button">Go to Inbox</a>
                  </li>
                  <li className="card" id="feature-profiling">
                    <h2>SHOWCASE</h2>
                    <p>Put your best work forward. Display your portfolio, highlight your skills, and impress potential clients with your expertise.</p>
                    <a href="module5/5.1 portfolio.html" className="normal-button">Go to Portfolio</a>
                  </li>
                </ul>
              </div>
            </section>
        </div>
    );
}

export default Home