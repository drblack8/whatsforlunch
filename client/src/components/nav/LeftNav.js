//contains nav components for left side of bar, i.e logo, home, library
import React from 'react';
// import HomeLogo from '../../style/Home'
import { Link } from 'react-router-dom';


function LeftNav(){
  
    return(
        <div className="leftnav">
            <Link to='/' id="logo">
                <div id='logoimg'>WhatsForLunch</div>
            </Link>
        </div>
    )
}

export default LeftNav;