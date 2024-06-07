import React, { useState } from 'react';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Modules Page Navigation (in the navbar UI)
    // Please configure/reconfigure here
    const navItems = [
        { path: "/", title: "Home" },
        { path: "/JobSearch", title: "Jobs", subItems: [
            { path: "/JobSearch", title: "Search Job" },
            { path: "/PostJob", title: "Post A Job" }
        ]},
        { path: "/Inbox", title: "Inbox", subItems: [
            { path: "/Inbox", title: "Chat" },
            { path: "/Feedback", title: "Feedback" }
        ]},
        { path: "/Module6Page", title: "Forum" },
        { path: "/Module5Page", title: "Profile", subItems: [
            { path: "/Portfolio", title: "Portfolio" },
            { path: "/CareerAssessInterest", title: "Career Access Interest" },
            { path: "/JobApplied", title: "Job Applied" },
            { path: "/Payments", title: "Payments" },
            { path: "/Settings", title: "Settings" }
        ]}
    ];

    return (
        <header>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/images/logo.png" width="30px" height="30px" style={{ marginRight: '10px', marginBottom: '3px' }} alt="Logo" />
                <h1 className="logo">FlexJobs</h1>
            </div>

            <nav className="navbar">
                {/* Hamburger menu for smaller screen */}
                <input 
                    type="checkbox" 
                    id="menu-toggler" 
                    checked={isMenuOpen}
                    onChange={handleMenuToggler} 
                />
                <label htmlFor="menu-toggler" id="hamburger-button">
                    <i className="fa-solid fa-bars"></i>
                </label>

                {/* Navigation links */}
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {/* Modules navigation */}
                    {navItems.map(({ path, title, subItems }) => (
                        <li key={path} className="nav-item">
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {title} {subItems && <i className="fa-solid fa-caret-down"></i>}
                            </NavLink>
                            {subItems && (
                                <ul className="dropdown-menu">
                                    {subItems.map(subItem => (
                                        <li key={subItem.path}>
                                            <NavLink
                                                to={subItem.path}
                                                className={({ isActive }) => isActive ? "active" : ""}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {subItem.title}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}

                    {/* Login */}
                    <li>
                        <Link to="/Login" className='nav-item'>
                            <i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Log in
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
