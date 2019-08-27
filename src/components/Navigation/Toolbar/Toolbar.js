import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';


const toolbar = (props) => {
  return (
      <header className={classes.Toolbar}>
          <DrawerToogle clicked={props.drawerToogleClicked}/>
          <div className={classes.Logo}>
          <Logo height="80%" />
          </div>
          <nav className={classes.DesktopOnly}>
              <NavigationItems></NavigationItems>
          </nav>
      </header>
  )
}

export default toolbar
