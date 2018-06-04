import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { postOrder } from '../actions/postOrder';
import {bindActionCreators} from 'redux';
import Order from "./Order"

class PostOrder extends React.Component {
    constructor(props)
    {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e)
    {
      console.log(e.target)
      let form = e.target
      console.log(form)
      e.preventDefault();
      const { dispatch } = this.props
      dispatch(postOrder(form[0].value,form[1].value,form[2].value,form[3].value))
    }
  
    // handleCustomerIdChange(e){

    // }

    // handleMakeChange(e){

    // }
    // handleModelChange(e){

    // }

    // handlePackageChange(e){

    // }
    render() {
        const {order,error,status} = this.props;
        var message = ""
        switch (status) {
          case null: {
            message = "" ;
            break;
          }
          case "LOADING":{
            message = "Pending";
            break;
          }
          case "ERROR":{
            console.log(error);
            message = "ERROR " + error.response.data;
            break;
          }
          case "SUCCESS":{
            message ="congrats! Your order is successful! You can download the order file at :" + order.download_link
            break;
          }
          default:{
            message =""
          }
        }
        return(
        <div>
          <div>
            <h1>Post an Order using the form</h1>
            <h2>Instructions</h2>  
            <ul>Supplier
              <li>
                <h3>acme</h3> 
                <p>Supplies model of anvil,wile,roadrunner</p> 
                <p>Supplies package of std,super,elite</p>
              </li>
              <li>
                <h3>rainer</h3> 
                <p>Supplies model of pugetsound,olympic</p> 
                <p>Supplies package of mtn,ltd,14k</p>
              </li>
            </ul>
            <h3>Type in proper value in each cell and click submit, then the result would be shown below the form.</h3>
          </div>
        <form onSubmit={this.handleSubmit}>
        <label>
          CusmoterID         <input type="text" placeholder="CusmoterID " />

        </label>

        <label>
          make          <input type="text" placeholder="make " />

        </label>

        <label>
          model          <input type="text" placeholder="model " />

        </label>

        <label>
          package          <input type="text" placeholder="package " />

        </label>

        <input type="submit" value="Submit" />
      </form>
      <h2>{message}</h2>
      </div>)
    }
  }
  
  const mapStateToProps = state => ({
    order: state.postOrder.order,
    status: state.postOrder.status,
    error: state.postOrder.error
  });
  
  // const mapDispatchToProps = dispatch => ({
  //   handleSubmit:
  // })
  
 
  export default connect(mapStateToProps)(PostOrder);

// export default PostOrder