import React from "react";
import './Module2.css';

const Banner = ({query, locationQuery, handleInputChange, handleLocationInputChange}) => {
    return (
        <div className="section">
            {/* Title */}
            <h1 className="lh-lg fw-bold banner-h1 d-flex">Find your&nbsp;<span className="blue-text">new job</span>&nbsp;today</h1>
            <p>Explore a wide range of job opportunities from multiple companies and take the next step in your career journey.</p>

            {/* Input fields */}
            <form>
                <div className="flex row g-3">
                    {/* Input field for job title */}
                    <div className="flex col-sm-7">
                        <span className="input-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
                        <input
                            type="text"
                            name="job-title"
                            id="job-title"
                            className="form-control input-field"
                            placeholder="What job position are you looking for?"
                            onChange={handleInputChange}
                            value={query}
                        />
                    </div>

                    {/* Input field for location */}
                    <div className="flex col-sm">
                        <span className="input-icon"><i className="fa-solid fa-location-dot"></i></span>
                        <input
                            type="text"
                            name="job-location"
                            id="job-location"
                            className="form-control input-field"
                            placeholder="Location"
                            onChange={handleLocationInputChange}
                            value={locationQuery}
                        />
                    </div>

                    {/* Search button */}
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Banner;