import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Home" },
        { path: "/JobSearch", title: "Jobs" , subItems: [
            { path: "/JobSearch", title: "Job Search" },
            { path: "/PostJob", title: "Post A Job" }
  
        ]},
        { path: "/Module3Page", title: "Inbox" , subItems: [
            { path: "/Chat", title: "Chat" },
            { path: "/Feedback", title: "Feedback" }
  
        ]},
        { path: "/Module6Page", title: "Forum" },
        { path: "/Module5Page", title: "Profile", subItems: [
            { path: "/Module5Page", title: "Portfolio" },
            { path: "/CareerAccessInterest", title: "Career Access Interest" },
            { path: "/JobsApplied", title: "Jobs Applied" },
            { path: "/Payments", title: "Payments" },
            { path: "/Settings", title: "Settings" }
        ]}
    ];

   return (
        <header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/images/logo.png" width="30px" height="30px" style={{ marginRight: '10px' }} alt="Logo" />
                <h1 className="logo">FlexJobs</h1>
            </div>

            <nav className="navbar">
                <input 
                    type="checkbox" 
                    id="menu-toggler" 
                    checked={isMenuOpen}
                    onChange={handleMenuToggler} 
                />
                <label htmlFor="menu-toggler" id="hamburger-button">
                    <i className="fa-solid fa-bars"></i>
                </label>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {navItems.map(({ path, title, subItems }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {title} {subItems && <i className="fa-solid fa-caret-down"></i>}
                            </NavLink>
                            {subItems && (
                                <ul>
                                    {subItems.map(({ path, title }) => (
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
                                </ul>
                            )}
                        </li>
                    ))}
                    <li>
                        <Link to="/login" className='nav-item'>
                            <i className="bi bi-door-open-fill"></i> Log in
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
