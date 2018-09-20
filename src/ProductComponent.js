import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProductComponent extends Component {
    constructor() {
        super()
        this.state = {
            cart: []
        }
    }


    render() {
        let product = this.props.product;
        var color = "";

        if (product.Stock > 0) {
            color = "green"
        } else if (product.Stock < 1) {
            color = "red"
        }

        let emptycart = "";

        if (this.props.product.Stock < 1) {
            emptycart = <div>

                <button disabled onClick={(event) => {this.props.handleClick(product)}} className="greybutton">Lägg i kundvagn</button>
            </div>
        } else {
            emptycart = <div>

                <button onClick={(event) => {this.props.handleClick(product)}} className="putincart">Lägg i kundvagn</button>
            </div>
            
        }

        return (
            <div className="singleproduct">
                <Link to={"/product/" + product.id}>
                    <h3>{product.Name}</h3>
                    <img className="productimage" src={"http://localhost:1337" + product.Image.url} alt="failedtoload" />

                </Link>
                <p className={color}>{product.Stock} i lager</p>
                <h4 className="h4cartprice">{product.Price}:-</h4>
                {emptycart}
            </div>
        );
    }
}

export default ProductComponent;
