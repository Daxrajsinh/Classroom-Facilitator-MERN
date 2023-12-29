import React from 'react';
import './Sidebar.css';
import { Public, AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <NavLink to="/">Home</NavLink>
                    </div>
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
        </div>
    )
}
