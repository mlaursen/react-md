import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LOGO } from '../helpers/constants';

import firebase from 'firebase/compat/app';

import '../styles/Header.scss';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';

import { auth } from '../modules/firebase';
import { isAdmin } from '../helpers/helperFunctions';

function Header(props) {
  const currentUser = props.user;

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };

    return (
      <Button
        className="sign-in"
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In
      </Button>
    );
  }

  function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <React.Fragment>
        <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: 'background.paper' }}
        >
          <ListItem
            button
            id="lock-button"
            key="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {isAdmin ? (
              [
                <Badge
                  color="secondary"
                  overlap="circular"
                  variant="dot"
                  key="avatar-user-admin"
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={currentUser.avatarUrl}
                  />
                </Badge>,
              ]
            ) : (
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={currentUser.avatarUrl}
                key="avatar-user"
              />
            )}
            <ListItemText primary={currentUser.displayName} />
          </ListItem>
        </List>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem key="profile">
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          {isAdmin ? (
            [
              <MenuItem key="admin">
                <Link to="/admin">
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Admin
                </Link>
              </MenuItem>,
            ]
          ) : (
            <></>
          )}
          <MenuItem onClick={() => auth.signOut()} key="logOut">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <img alt="Logo" src={LOGO} className="logo" />
        </Link>
        <Link to="events">Events</Link>
      </div>
      {auth.currentUser ? <AccountMenu /> : <SignIn />}
    </header>
  );
}

export default Header;
