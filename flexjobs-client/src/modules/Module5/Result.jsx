import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './5.2 Result.css';

const Results = () => {
    const location = useLocation();
    const [results, setResults] = useState({});
    const username = "sample_username"; // Replace with actual username or get from user context

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resultsObj = {};
        for (let [key, value] of queryParams.entries()) {
            resultsObj[key] = parseInt(value);
        }
        setResults(resultsObj);
    }, [location.search]);

    useEffect(() => {
        if (Object.keys(results).length > 0) {
            // Send results to the backend
            saveResults(username, results);
        }
    }, [results]); // Only call saveResults when results change

    const saveResults = async (username, results) => {
        try {
            const response = await fetch('http://localhost:3000/save-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, results }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            console.log(data); // Handle success
        } catch (error) {
            console.error('Error:', error); // Handle error
        }
    };
    return (

        <div>
            <h1 className="Assesstitle">Assessment Results</h1>
            <div className="main-content">
                <div className="c-container">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="result-container" id="result-container">
                    {Object.entries(results).map(([category, ticks]) => (
                        ticks > 0 && <p key={category}>Category {category}: {ticks} tick(s)</p>
                    ))}
                </div>
            </div>

            <h1 className="Careertitle">Career Interest Areas</h1>
            <p class="custom-paragraph">
                A. Arts, A/V Technology and Communications: Interest in creative or performing arts, communication or A/V technology.
            </p>
            <p class="custom-paragraph">
                B. Science, Technology, Engineering and Mathematics: Interest in problem-solving, discovering, collecting and analyzing information and applying findings to problems in science, math and engineering.
            </p>
            <p class="custom-paragraph">
                C. Plants, Agriculture and Natural Resources: Interest in activities involving plants, usually in an outdoor setting.
            </p>
            <p class="custom-paragraph">
                D. Law, Public Safety, Corrections and Security: Interest in judicial, legal and protective services for people and property.
            </p>
            <p class="custom-paragraph">
                E. Mechanical Manufacturing: Interest in applying mechanical principles to practical situations using machines, hand tools or techniques.
            </p>
            <p class="custom-paragraph">
                F. Industrial Manufacturing: Interest in repetitive, organized activities in a factory or industrial setting.
            </p>
            <p class="custom-paragraph">
                G. Business, Management and Administration: Interest in organizing, directing and evaluating business functions.
            </p>
            <p class="custom-paragraph">
                H. Marketing, Sales and Service: Interest in bringing others to a point of view through personal persuasion, using sales or promotional techniques.
            </p>
            <p class="custom-paragraph">
                I. Hospitality and Tourism: Interest in providing services to others in travel planning and hospitality services in hotels, restaurants and recreation.
            </p>
            <p class="custom-paragraph">
                J. Human Services: Interest in helping others with their mental, spiritual, social, physical or career needs.
            </p>
            <p class="custom-paragraph">
                K. Government and Public Administration: Interest in performing government functions at the local, state or federal level.
            </p>
            <p class="custom-paragraph">
                L. Architecture, Design and Construction: Interest in designing, planning, managing, building and maintaining physical structures.
            </p>
            <p class="custom-paragraph">
                M. Education and Training: Interest in planning, managing and providing educational services, including support services, library and information services.
            </p>
            <p class="custom-paragraph">
                N. Finance, Banking, Investments and Insurance: Interest in financial and investment planning and management, and providing banking and insurance services.
            </p>
            <p class="custom-paragraph">
                O. Health Sciences, Care and Prevention: Interest in helping others by providing diagnostic, therapeutic, informational and environmental services, including researching and developing new health care services.
            </p>
            <p class="custom-paragraph">
                P. Information Technology (IT): Interest in the design, development, support and management of hardware, software, multimedia, systems integration services and technical support.
            </p>
            <p class="custom-paragraph">
                Q. Animals, Agriculture and Natural Resources: Interest in activities involving the training, raising, feeding and caring for animals.
            </p>
            <p class="custom-paragraph">
                R. Transportation, Distribution and Logistics: Interest in the movement of people, materials and goods by road, pipeline, air, railroad or water.
            </p>
        </div>
    );
};

export default Results;