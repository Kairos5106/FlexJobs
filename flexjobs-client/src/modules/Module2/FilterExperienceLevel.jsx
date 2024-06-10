import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';

const FilterExperienceLevel = ({ handleChangeExperienceLevel }) => {
    return (
        <div className='card mt-3 py-3 px-3'>
            <h5>Filter by Experience Level</h5>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="experienceEntry" name="experienceLevel" value="Entry-Level" onChange={handleChangeExperienceLevel} />
                <label className='form-check-label' htmlFor="experienceEntry">Entry</label>
            </div>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="experienceMiddle" name="experienceLevel" value="Mid-Level" onChange={handleChangeExperienceLevel} />
                <label className='form-check-label' htmlFor="experienceMiddle">Middle</label>
            </div>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="experienceSenior" name="experienceLevel" value="Senior-Level" onChange={handleChangeExperienceLevel} />
                <label className='form-check-label' htmlFor="experienceSenior">Senior</label>
            </div>
        </div>
    );
}

export default FilterExperienceLevel;