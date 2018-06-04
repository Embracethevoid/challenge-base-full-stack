import axios from 'axios'
export const POST_PENDING = 'POST_PENDING';
export const POST_RESOLVED = 'POST_RESOLVED';
export const POST_REJECTED = 'POST_REJECTED';

  
export function postOrder (customerId,make,model,packageName) {
    return (dispatch) => {
        console.log(customerId,make,model,packageName);
        dispatch(postPending());
        axios
        .post("http://localhost:8000/order",
            {
                make:make,
                customer_id:customerId,
                model:model,
                package:packageName
            }
        )
        .then((res) => {return res.data})
        .then((data)=>{
            console.log("correct data")
            console.log(data)
            dispatch(postResolved(data))
            return data
        })
        .catch((err)=>{
            dispatch(postRejected(err))
            return err;
        })
    }
}

export function postPending(){ 
    return {
        type:POST_PENDING
    }
}

export function postResolved(order)
{
    return{
        type:POST_RESOLVED,
        payload:order
    }
}

export function postRejected(error)
{
    return{
        type:POST_REJECTED,
        payload:error
    }
}




