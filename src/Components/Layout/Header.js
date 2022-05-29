import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import './Header.css'
import { Box } from '@mui/system';

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    navigate("/login");
  };

  const searchChallenge=(event)=>{
    const challengeList = document.querySelectorAll(".MuiCardHeader-title");
    const challengeItem=document.querySelectorAll("#challenge_card");
    for (let index = 0; index < challengeList.length; index++) {
     if(challengeList[index].innerText.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1){
      challengeItem[index].style.display="";
     }else{
      challengeItem[index].style.display="none";
     }
    }
  }

  return (
    <div className="header">
      <div className="headerRight">
        <img
          src="https://image.shutterstock.com/image-photo/image-260nw-743186359.jpg"
          alt="Employee logo icon"
        />
      </div>
      <div className="headerMiddle">
        <SearchIcon />
        <input type="text" placeholder="Search Challenge" onChange={searchChallenge}/>
        <KeyboardArrowDownIcon />
      </div>
      <div className="headerLeft">
      {sessionStorage.getItem('Empid') ? <React.Fragment> <IconButton title="Home">
          <Link className='nav_title' to={"/home"}>HOME</Link>
        </IconButton>
        <IconButton title="Add Challenge">
          <Link className='nav_title' to={"/challenge"}>CHALLENGE</Link>
        </IconButton></React.Fragment>:null}
        <div>
          {sessionStorage.getItem('Empid') ? <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleMenu} title={sessionStorage.getItem('ename')}>
          <Avatar
            src={`https://avatars.dicebear.com/api/avataaars/${Math.floor(
              Math.random() * 5000
            )}.svg`}
            className="headerAvatar"
          />
        </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </Box> : <Link className='nav_title' to={"/login"}>LOGIN</Link>}
        </div>
      </div>
    </div>
  );
}
export default Header;