import React from 'react'
import Education from './Education';
import Experience from './Experience';
import Skill from './Skill'
import Honor from './Honor';
import Organization from './Organization';
import Profile from './Profile';
const Portfolio = () => {
    return (
        <div>
            <Profile/>
            <Experience /> 
            <Education /> 
            <Skill/>
            <Honor/> 
            <Organization/>
        </div>
        
    )
}

export default Portfolio