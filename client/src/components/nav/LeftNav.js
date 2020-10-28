//contains nav components for left side of bar, i.e logo, home, library
import React from 'react';
import Logo from '../../style/svg/what4lunch_text.svg'
import { Link } from 'react-router-dom';


function LeftNav(){
  
    return(
        <div className="leftnav">
            <Link to='/feed' id="logo">
                <img id='logoimg' src={Logo} alt='' ></img>
            </Link>
        </div>
    )
}

export default LeftNav;