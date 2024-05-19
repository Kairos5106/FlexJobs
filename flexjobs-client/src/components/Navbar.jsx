import React, { useState } from 'react'
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        {path: "/", title: "Home"},
        {path: "/JobSearch", title: "Jobs"},
        {path: "/Module3Page", title: "Inbox"},
        {path: "/XXX", title: "Forum"},
        {path: "/XXX", title: "Profile"},
    ];

    return (
        <header>
            <nav className="navbar">

                {/* Logo */}
                <a href="/" className="d-flex align-items-center logo">
                    <img src="/images/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <span>FlexJobs</span>
                </a>

                {/* Hamburger menu for smaller screen */}
                <input 
                    type="checkbox" 
                    id="menu-toggler" 
                    checked={isMenuOpen}
                    onChange={handleMenuToggler} 
                />
                <label htmlFor="menu-toggler" id="hamburger-button">
                    <i className="fas fa-bars"></i>
                </label>

                {/* Navigation links */}
                <ul className={`nav nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {navItems.map(({ path, title }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <Link to="/XX" className='nav-item'>
                            <i className="fas fa-sign-in-alt"></i> Log in
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar