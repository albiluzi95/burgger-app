import React, {Component} from 'react';
import classes from './Burger.css';
import { withRouter } from 'react-router-dom'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

class Burger extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
       // console.log(this.props.ingredients)
        let transformedIngredients = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return [...Array(this.props.ingredients[igKey])].map((_,i) =>{
                return <BurgerIngredients key={igKey+i} type={igKey}/>
            });
        }).reduce(( arr , el ) => {
            return arr.concat(el)
        }, []);
        if (transformedIngredients.length ===0) {
            transformedIngredients = <p>Please start adding ingredinets</p>;
        }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom"/>

    </div>
    )
 }
}

export default withRouter(Burger)
