import React, { useState, useContext } from 'react';
import '../App.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const Navbar = () => {
    const { user } = useContext(UserContext); // contains user ID, email and name
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navigate = useNavigate();
    const portfolioTitle = user ? user.name : "Profile";
    // Modules Page Navigation (in the navbar UI)
    // Please configure/reconfigure here
    const navItems = [
        { path: "/", title: "Home" },
        { path: "/JobSearch", title: "Jobs", subItems: [
            { path: "/JobSearch", title: "Search Job" },
            { path: "/ModifyJobs", title: "Manage Job Post" },
            { path: "/JobApplied", title: "Job Applied" },

        ]},
        { path: "/Chat", title: "Inbox", subItems: [
            { path: "/Chat", title: "Chat" },
            { path: "/Feedback", title: "Feedback" }
        ]},
        { path: "/Module6Page", title: "Forum" },
        { path: "/Portfolio", title: portfolioTitle, subItems: [
            { path: "/Portfolio", title: "Portfolio" },
            { path: "/CareerAssessInterest", title: "Career Access Interest" },       
            { path: "/Payments", title: "Payments" },
        ]}
    ];

    // User log out
    const handleLogout = async (e) => {
        try{
            console.log("Logging out...")
            // Log out user
            const {data} = await axios.get('/auth/logout');
            // Redirect to home page
            navigate('/');
            window.location.reload();
        } catch (error) {
          console.log(error);
        }
    };

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
                    {navItems.map(({ path, title, subItems }) => {
                        // Check if user exists and if the path should be hidden for non-logged in users
                        if (!user && path === '/Portfolio') {
                            return null;
                        }
                        if (!user && path === '/Chat') {
                            return null;
                        }
                    
                        return (
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
                        );
                    })}

                    {/* Login */}
                    {!user && (
                        <li>
                            <Link to="/Login" className='nav-item'>
                                <i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Log in
                            </Link>
                        </li>
                    )}
                    {/* Logout */}
                    {!!user && (
                        <li>
                            <button className='nav-item' onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Log out
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
