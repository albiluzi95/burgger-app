import React, {Component} from 'react';
// import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class layout extends Component{

  state = {
    showSideDrawer:false
  }
  sideDrawerClosehandler =() =>{
    this.setState({showSideDrawer:false})
  }
  sideDrawerToogleHandler =() =>{
    this.setState((prevState) =>{
     return {showSideDrawer: !prevState.showSideDrawer}
    })
  }
  render(){
    return (
    <div>
      <Toolbar drawerToogleClicked={this.sideDrawerToogleHandler}></Toolbar>
      <SideDrawer closed={this.sideDrawerClosehandler} open={this.state.showSideDrawer}></SideDrawer>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </div>
      );
    }
  }
export default layout;