//contains nav components for left side of bar, i.e logo, home, library
import React from 'react';
import Logo from '../../style/svg/what4lunch_text.svg'
import { Link } from 'react-router-dom';
import WFLLogo from '../../style/images/WFLLogo.jpg';
import WFLW from '../../style/images/WFLW.png'


function LeftNav() {

    return (
        <div className="leftnav">
            <Link to='/feed' id="logo">
                <img id='logoimg' src={WFLLogo} alt='' ></img>
                <img id='logoimg2' src={WFLW}></img>
            </Link>
        </div>
    )
}

export default LeftNav;
