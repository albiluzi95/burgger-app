import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = props => {
  return (
      <ul className={classes.NavigationItems}>
          <NavigationItem link="/" exact>Fancy Burger Builder</NavigationItem>
          <NavigationItem link="/Orders">My Orders</NavigationItem>
      </ul>
  )
}



export default navigationItems
