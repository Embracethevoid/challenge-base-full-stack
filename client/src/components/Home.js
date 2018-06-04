import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                <div className="padding-20">
                    <h1>Home</h1>
                    <p>
                        Welcome to the home page, everyone can see this!
                    </p>
                    <p>
                        To get orders please visit /getorders
                    </p>
                    <p>
                        To post an order please visti /postorder
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
