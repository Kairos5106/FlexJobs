import React from "react";
import './Module2.css';

const Jobs = ({result, jobCount}) => {
    return (
        <div>
            <h3 className="number-of-jobs"><span id="number-of-jobs">{jobCount}</span>&nbsp;Jobs</h3>
            <div className="cards flex">
                {result}
            </div>
        </div>
    )
}

export default Jobs