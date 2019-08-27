import React, { Component } from 'react';
//import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

 export class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props)
    // }
    state = {
        purchasing:false,
    }
    componentDidMount(){
      this.props.onInitIngredients();

    }

    updatePurchaseState(ingredients){
      const sum = Object.keys(ingredients)
      .map(igKey =>{
        return ingredients[igKey]
      })
      .reduce((sum,el) =>{
        return sum + el;
      },0);
      
        return sum > 0
     
    }

    // addIngredientHandler = (type) =>{
    //   const oldCount = this.props.ings[type];
    //   const updatedCount = oldCount + 1;
    //   const updatedIngredients = {
    //     ...this.props.ings
    //   };
    //   updatedIngredients[type] = updatedCount;
    //   const priceAddition = INGREDIENTS_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newPrice = oldPrice + priceAddition;
    //   this.setState({
    //     totalPrice:newPrice,
    //     ingredients:updatedIngredients
    //   });
    //   this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) =>{
    //   const oldCount = this.props.ings[type];
    //   if(oldCount<=0){
    //     return;
    //   }
    //   const updatedCount = oldCount - 1;
    //   const updatedIngredients = {
    //     ...this.props.ings
    //   };
    //   updatedIngredients[type] = updatedCount;
    //   const priceDeduction = INGREDIENTS_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newPrice = oldPrice - priceDeduction;
    //   this.setState({
    //     totalPrice:newPrice,
    //     ingredients:updatedIngredients
    //   });
    //   this.updatePurchaseState(updatedIngredients);
    // }

    purchasingHandler = ()=>{
      this.setState({purchasing:true})
    }

    purchaseCancelHandler = () =>{
      this.props.onInitPurchased();
      this.setState({purchasing:false})
    }
    purchaseContinueHandler = () =>{

    this.props.history.push('checkout')
    }
  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0;
    } 
    let orderSummary = null;


    let burger =this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner></Spinner>

    if(this.props.ings){
     burger = (<div><Burger ingredients = {this.props.ings}/>
    <BuildControls
    ingredientAdded = { this.props.onIngredientsAdded }
    ingredientRemoved = { this.props.onIngredientsRemoved }
    disabled={disabledInfo}
    price={this.props.price}
    purchasable = {this.updatePurchaseState(this.props.ings)}
    ordered ={this.purchasingHandler}
    /></div>);

    orderSummary = <OrderSummary
    ingredients={this.props.ings} 
    price={this.props.price}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseCountinued={this.purchaseContinueHandler}/>
     }
    return (
        <div>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
        {burger}
        </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    ings:state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error
  };
}


const mapDispatchToProps = dispatch =>{
  return {
    onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchased: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))