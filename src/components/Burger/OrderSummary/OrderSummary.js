import React, {Component} from 'react'
import Button from '../../UI/Button/Button'
//import Aux from '../../../hoc/Aux';

class OrderSummary extends Component{


  render(){
    const ingredientsSummary =Object.keys(this.props.ingredients)
    .map(igKey =>{
        return <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
    })
  return (
    <div>
      <div>
          <h3>Your Order</h3>
          <p>A delicious order with the following ingredients:</p>
          <ul>
                {ingredientsSummary}
          </ul>
          <p><strong>Total Price: </strong>{this.props.price.toFixed(2)}</p>
          <p>Continue to checkout.</p>
          <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
          <Button btnType="Success" clicked={this.props.purchaseCountinued}>Continue</Button>

      </div>
    </div>
  )
  }
}


export default OrderSummary
