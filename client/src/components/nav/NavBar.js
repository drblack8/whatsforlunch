import React from 'react';
import LeftNav from './LeftNav'
import MiddleNav from './MiddleNav'
import RightNav from './RightNav'
import '../../style/navbar.css'

function NavBar(){
    

    return (
        <div className="navbar-container">
            <div className="outer-nav">
                <div className="navbar">
                    <LeftNav />
                    <MiddleNav />
                    <RightNav />
                </div>
            </div>
        </div>
    )
}

export default NavBar;
