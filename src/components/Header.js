import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';


function Header() {
    return (
        <header className="header">
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </nav>
        </header>
    );
}

export default Header;
