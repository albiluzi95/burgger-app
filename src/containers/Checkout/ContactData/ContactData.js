import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {

    state = { 
      orderForm:{
       name: {
         elementType:'input',
         elementConfig:{
           type:'text',
           placeholder:'Your Name'
         },
         value:'',
         validation:{
           required:true,
           minLength:5,
           maxLength:10
         },
         valid:false,
         touched:false,
         errorMessage:"please enter a valid name"
       },
       street:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Street'
        },
        value:'',
        validation:{
          required:true,     
          minLength:5,
          maxLength:10
        },
        valid:false,
        touched:false,
        errorMessage:"please enter a valid street"
      },
       zipCode:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Zip Code'
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:10
        },
        valid:false,
        touched:false,
        errorMessage:"please enter a valid zip code"
      },
       country:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Country'
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:10
        },
        valid:false,
        touched:false,
        errorMessage:"please enter a valid country"
      },
       email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Your E-mail'
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:15
        },
        valid:false,
        touched:false,
        errorMessage:"please enter a valid email"
      },
       deliveryMethod:{
        elementType:'select',
        elementConfig:{
          options:[
            {value:'normal', displayValue:'normal'},
            {value:'fastest', displayValue:'fastest'}
          ]
        },
        value:'normal',
        valid:true,
        errorMessage:"please enter a valid delicery method",
        validation:{
          required:false
        },
      }
    },
    formIsValid:false      
}

    orderHandler = (event) =>{
        event.preventDefault();
        const formData = {};
        for(let formElementIndetifier in this.state.orderForm){
          formData[formElementIndetifier] = this.state.orderForm[formElementIndetifier].value
        }
      const order = {
        ingredients: this.props.ings,
        price:this.props.price,
        orderData:formData
        // ingredients:this.props.ingredients
      }
      this.setState({loading:true });
      this.props.onOrderBurger(order)


    
    // const queryParams =[];
    // for (let i in this.state.ingredients) {
    //  queryParams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.state.ingredients[i]))
    // }
    // const queryString = queryParams.join('?')
    }


    checkValidaty(value, rules) {
      let isValid = true;
      
      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      return isValid;
  }


     inputChangedHandler = (event,inputIdentifier)=>{
       const updatedOrderForm ={
         ...this.state.orderForm
       }
      const updatedOrderElement = { 
        ...updatedOrderForm[inputIdentifier]
       };
      updatedOrderElement.value = event.target.value;
      updatedOrderElement.valid = this.checkValidaty(updatedOrderElement.value,updatedOrderElement.validation);
      updatedOrderElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedOrderElement;
      let formIsValid= true;
      for(let identifier in updatedOrderForm){
        formIsValid = updatedOrderForm[identifier].valid && formIsValid
      }
      this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
      

    }
  render() {
    const formElementArray = [];
    for(let key in this.state.orderForm){
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
      let form =(
        <form>
        {formElementArray.map(formElement =>(
          <Input 
          key = {formElement.id}
          elementType = { formElement.config.elementType}
          elementConfig = {formElement.config.elementConfig}
          value = {formElement.config.value}
          invalid = {!formElement.config.valid}
          shouldValidate = {formElement.config.validation}
          touched = {formElement.config.touched}
          changed = {(event) => this.inputChangedHandler(event,formElement.id)}
          errorMessage = {formElement.config.errorMessage}></Input>
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
    </form>
      );
      if(this.props.loading) {
          form = <Spinner />
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}
const mapStateToProps = state =>{
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading:state.order.loading

  }
}
const mapDispatchToProps = dispatch =>{
  return {
  onOrderBurger: (orderData) =>dispatch(actions.purchaseBurger(orderData))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));