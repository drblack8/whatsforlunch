import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { NavLink, Redirect } from 'react-router-dom';
import UserLogo from "../../style/svg/usericon.svg"
import HomeLogo from "../../style/svg/home.svg"
import PostLogo from "../../style/svg/post.svg"
    
function RightNav(){
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };

    const handleLogOut = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false);
    
        return (<Redirect to='/login' />)
    };

    const handleProfile = (event) => {
        setOpen(false);
      
        return <Redirect to='/profile' />
    };

  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
  

    
    return(
        <div className="rightnav">
            <div >
              <NavLink to='/' >
                <Button
                  onClick={() => <Redirect to='/' />}
                >
                  <img src={HomeLogo} alt=''/>  
                </Button>
              </NavLink>
            </div>
            <div >
              <NavLink to="/posts/new" activeclass="active" >
                <Button
                  onClick={() => <Redirect to="/posts/new" />}
                >
                  <img src={PostLogo} alt=''/>  
                </Button>
              </NavLink>
            </div>
            <div>
                <Button 
                    id="settings"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                  <img src={UserLogo} alt='' />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>                                   
                                    <MenuItem onClick={handleProfile}><NavLink to='/profile' id='navlink-profile'>Profile</NavLink></MenuItem>
                                    <MenuItem onClick={handleLogOut}><NavLink to='/login' id='navlink-logout'>Logout</NavLink></MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    )
}

export default RightNav;