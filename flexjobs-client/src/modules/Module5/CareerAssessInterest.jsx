
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./5.2 CareerAccess.css";
const questions = [
    'A – Operate a printing press',
    'B – Study the causes of earthquakes',
    'C – Plant and harvest crops',
    'R – Replace a car window and fender',
    'E – Analyze reports and records',
    'F – Operate a machine',
    'G – Work in an office',
    'H – Answer customer questions',
    'D – Write reports',
    'J – Help former prison inmates find work',
    'L – Design a freeway',
    'M – Plan educational lessons',
    'N – Balance a checkbook',
    'O – Take an X-ray',
    'P – Write a computer program',
    'Q – Train animals',
    'C – Be in charge of replanting forests',
    'A – Act in a TV show or movie',
    'E – Make three-dimensional items',
    'D – Analyze handwriting',
    'B – Design indoor sprinkler systems',
    'F – Run a factory sewing machine',
    'G – Develop personnel policies',
    'Q – Train racehorses',
    'D – Guard an office building',
    'H – Run a department store',
    'A – Write for a newspaper',
    'G – Use a calculator',
    'O – Help people at a mental health clinic',
    'L – Remodel old houses',
    'M – Care for young children',
    'D – Locate a missing person',
    'N – Plan estate disbursements/payments',
    'P – Enter data',
    'A – Design a book cover',
    'E – Build toys with written instructions',
    'B – Figure out why someone is sick',
    'R – Fly an airplane',
    'C – Learn how things grow and stay alive',
    'H – Sell cars',
    'I – Work as a restaurant host or hostess',
    'D – Fight fires',
    'G – Keep payroll records for a company',
    'J – Work in a nursing home',
    'G – Hire new staff',
    'O – Run ventilators/breathing machines',
    'R – Drive a taxi',
    'A – Broadcast the news',
    'K – Audit taxes for the government',
    'B – Sort and date dinosaur bones',
    'O – Give shots',
    'C – Design landscaping',
    'P – Give tech support to computer users',
    'D – Work in a courtroom',
    'Q – Care for injured animals',
    'I – Serve meals to customers'
];

const CareerAssessInterest = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I:0, J: 0, K: 0, L: 0, M: 0, N: 0, O: 0, P: 0, Q: 0, R: 0
    });

    const navigate = useNavigate();

    const handleCheckboxChange = (category) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [category]: prevState[category] + 1
        }));
    };

    const handleSubmit = () => {
        let queryParams = '';
        for (const category in selectedOptions) {
            queryParams += `${category}=${selectedOptions[category]}&`;
        }
        queryParams = queryParams.slice(0, -1);
        navigate(`/results?${queryParams}`);
    };

    return (
        <div>
            <h1>Career Test Assessment</h1>
            <div className="titlecontainer">
                <h2>
                    In order to choose a career that will give you personal satisfaction, you must spend some time thinking about what
                    really interests you. This activity helps you match your interests to different types of careers. For each item, circle the
                    letter of the activity you would rather do. It doesn’t matter if you like both of them a lot or dislike both of them a lot;
                    just pick the one you would rather do.
                </h2>
            </div>
            
            <div id="questions-container">
                {questions.map((question, index) => (
                    <div className="question-container" key={index}>
                        <label>{question}</label>
                        <input
                            type="checkbox"
                            name={question}
                            value="tick"
                            onChange={() => handleCheckboxChange(question[0])}
                        />
                    </div>
                ))}
            </div>
            <div className="submit-btn-container">
                <button id="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default CareerAssessInterest;
