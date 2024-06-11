import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';

const FilterSalary = ({ handleChange }) => {
    return (
        <div className='card py-3 px-3'>
            <h5>Filter by Salary</h5>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="salary1" name="salary" value="3000" onChange={handleChange} />
                <label className='form-check-label' htmlFor="salary1">&lt; $3,000</label>
            </div>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="salary2" name="salary" value="5000" onChange={handleChange} />
                <label className='form-check-label' htmlFor="salary2">&lt; $5,000</label>
            </div>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="salary3" name="salary" value="7000" onChange={handleChange} />
                <label className='form-check-label' htmlFor="salary3">&lt; $7,000</label>
            </div>
            <div className='form-check'>
                <input className='form-check-input' type="radio" id="salary4" name="salary" value="10000" onChange={handleChange} />
                <label className='form-check-label' htmlFor="salary4">&lt; $10,000</label>
            </div>
        </div>
    );
}

export default FilterSalary;