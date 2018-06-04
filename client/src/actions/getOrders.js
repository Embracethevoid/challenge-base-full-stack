import axios from 'axios'
export const GET_PENDING = 'GET_PENDING';
export const GET_RESOLVED = 'GET_RESOLVED';
export const GET_REJECTED = 'GET_REJECTED';

  
export function fetchOrders () {
    return (dispatch) => {
        dispatch(getPending());
        axios
        .get("http://localhost:8000/orders",{
            headers:{
                username:"admin",
                password:"admin"
            }
        })
        .then((res) => {return res.data})
        .then((data)=>{
            console.log(data)
            dispatch(getResolved(data))
            return data
        })
        .catch((err)=>{
            dispatch(getRejected(err.message))
            return err;
        })
    }
}

export function getPending(){ 
    return {
        type:GET_PENDING
    }
}

export function getResolved(orders)
{
    return{
        type:GET_RESOLVED,
        payload:orders
    }
}

export function getRejected(message)
{
    return{
        type:GET_REJECTED,
        payload:message
    }
}




