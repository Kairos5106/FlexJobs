import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';
import FilterSalary from './FilterSalary';
import FilterExperienceLevel from './FilterExperienceLevel';

const SidePanel = ({handleChange, handleChangeExperienceLevel}) => {
    return (
        <div>
            {/* Side panel heading */}
            <div class="col-heading filters-col-heading">
                <h3>Filters</h3>
            </div>

            {/* Filter based on salary */}
            <FilterSalary handleChange={handleChange} />

            {/* Filter based on experienceLevel */}
            <FilterExperienceLevel handleChangeExperienceLevel={handleChangeExperienceLevel} />
        </div>
    )
}

export default SidePanel