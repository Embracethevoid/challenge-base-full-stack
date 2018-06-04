import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { fetchOrders } from '../actions/getOrders';
import {bindActionCreators} from 'redux';
import Order from "./Order"

class OrderList extends React.Component {
    constructor(props)
    {
      super(props)
    }
    componentDidMount() {
      console.log("begin to fetch orders");
      const { dispatch } = this.props
      dispatch(fetchOrders())
    }
  
    render() {
      console.log(this.props)
      const { status, error, orders } = this.props;
      var content;
      if(!status){
        content =  <div>It will be ready for a short time</div>
      }
      if (status === "ERROR") {
        content = <div>Error! {error}</div>;
      }
  
      if (status === "LOADING") {
        content = <div>Loading...</div>;
      }
      if( status === "NOT_STARTED"){
        content = <div>not started yet</div>
      }
      if (status === "SUCCESS")
      {
        content = <ul>
        {orders.map(order =>
            <Order
              key={order.id}
              data = {order}
            />
        )}
    </ul>
      }
      return (
        <div>
            <div>
            <h1>This Page returns the orders which have been processd with details</h1>
            {content}
        </div>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({
    orders: state.getOrder.orders,
    status: state.getOrder.status,
    error: state.getOrder.error
  });
  
  function mapDispatchToProps(dispatch) {
    //Whenever FetchWeather is called the result will be passed
    //to all reducers
    return bindActionCreators({ fetchOrders }, dispatch)
  }

 
  export default connect(mapStateToProps)(OrderList);

