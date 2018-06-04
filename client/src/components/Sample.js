import React ,{ Component } from "react"



class Sample extends Component {
    componentDidMount()
    {
        console.log(12345);
    }
    render() {
        return (
            <div>
                <div className="padding-20">
                    <h1>sample</h1>
                    <p>
                        Welcome to the sample page, everyone can see this!
                    </p>
                </div>
            </div>
        );
    }
}

export default Sample;