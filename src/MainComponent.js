import React, { Component } from 'react';
import ProductListComponent from './ProductListComponent';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SingleProductComponent from './SingleProductComponent';
import CartComponent from './CartComponent';

class MainComponent extends Component {
   
    render() {
        return (
            <Router>
                <div>
                    <Switch>

                        <Route path="/product/:id" component={SingleProductComponent} />

                        <Route path="/cart" component={CartComponent} />

                        <Route path="/" component={ProductListComponent} />

                    </Switch>
                </div>

            </Router>
        );
    }
}

export default MainComponent;
