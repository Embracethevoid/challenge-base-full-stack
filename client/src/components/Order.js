import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Order extends Component
{    
    render()
    {
        return (
        <div>
            <h1>This Page returns the orders which have been processd with details</h1>
        <li>
            <ul>
                <li>
                    <h2>order:{this.props.data.order_id}</h2>
                </li>
                <li>
                    <h2>customer:{this.props.data.customer_id}</h2>
                </li>
                <li>
                    <h2>make:{this.props.data.make}</h2>
                </li>
                <li>
                    <h2>model:{this.props.data.model}</h2>
                </li>
                <li>
                    <h2>package:{this.props.data.package}</h2>
                </li>
            </ul>
        </li>
        </div>)
        }
}
export default Order