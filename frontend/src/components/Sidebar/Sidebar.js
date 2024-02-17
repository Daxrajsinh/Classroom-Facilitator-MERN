// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import { Public, AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <div className="link">
                            <div className="link-tag">
                                <Public />
                                <NavLink to="/questions">Questions</NavLink>
                            </div>
                            <div className="link-tag">
                                <AccountCircle />
                                <NavLink to="/profile">Profile</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                {collapsed ? '»' : '«'}
            </button>
        </div>
    );
}
