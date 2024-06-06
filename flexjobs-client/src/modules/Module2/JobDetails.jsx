import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';
import { useParams } from 'react-router-dom';


const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState([]);
    console.log("Job ID:", id);

    

    return (
        <div>
            JobDetails
        </div>
    )
}

export default JobDetails