import React, { useState } from 'react'
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        {path: "/", title: "Home"},
        {path: "/JobSearch", title: "Jobs"},
        {path: "/Module3Page", title: "Inbox"},
        {path: "/XXX", title: "Forum"},
        {path: "/XXX", title: "Profile"},
    ]

    return (
        <header>
            <nav>
                {/* logo (image & word) */}
                <a href="/" className="d-flex align-items-center logo">
                    <img src="/images/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <span>FlexJobs</span>
                </a>

                {/* nav items */}
                <ul className='nav'>
                    {
                        navItems.map(({path, title}) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>

                {/* log in button */}
                <div>
                    <Link to="/XX" className='nav-item'>
                        <i className="fas fa-sign-in-alt"></i> Log in
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar