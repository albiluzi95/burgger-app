import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
// import Aux from '../../../hoc/Aux';

const SideDrawer = props => {
    let attachedClasses =[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses =[classes.SideDrawer, classes.Open];
    }
  return (
    <div>
        <Backdrop show={props.open} clicked={props.closed}></Backdrop>
    <div className={attachedClasses.join(' ')}>
      <Logo height="11%"></Logo>
      <nav>
          <NavigationItems></NavigationItems>
      </nav>
    </div>
    </div>
  )
}


export default SideDrawer
