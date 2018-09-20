import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CartComponent extends Component {
    constructor() {
        super()

        this.state = {
            cart: [],
            order: {
                name: "",
                email: "",
                adress: ""
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAdress = this.handleChangeAdress.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
    }

    componentDidMount() {
        const newState = JSON.parse(localStorage.getItem("cart"));
        this.setState({
            cart: newState
        })
    }

    handleClick() {
        const newState = localStorage.removeItem("cart");
        this.setState({
            cart: newState
        })
    }

    makeOrder(e) {
        e.preventDefault();
        let productnames = [];
        let productamount = [];

        this.state.cart.map((product) => {
            productnames.push(product.Name)
            productamount.push(product.Price)
        })
        let namessum = productnames.join(" + ")
        let pricesum = productamount.reduce((a, b) => a + b, 0);

        if (this.state.cart) {

            axios.post("http://localhost:1337/orders", {
                Levererad: false,
                Name: this.state.order.name,
                Email: this.state.order.email,
                Productnames: namessum,
                Adress: this.state.order.adress,
                Amount: pricesum

            });

            const newState = localStorage.removeItem("cart");
            this.setState({
                cart: newState
            });
            alert("order lagd")
            this.setState({
                order: {
                    name: "",
                    email: "",
                    adress: ""
                }
            });
        } else {
            alert("Kundvagn tom :(")
        }
    }

    handleChangeName(e) {
        this.setState({
            order: {
                name: e.target.value,
                email: this.state.order.email,
                adress: this.state.order.adress
            }
        });

    }

    handleChangeEmail(e) {
        this.setState({
            order: {
                name: this.state.order.name,
                email: e.target.value,
                adress: this.state.order.adress
            }
        });

    }

    handleChangeAdress(e) {
        this.setState({
            order: {
                name: this.state.order.name,
                email: this.state.order.email,
                adress: e.target.value
            }
        });

    }

    render() {
        let cartlist = null;

        if (this.state.cart) {
            cartlist = this.state.cart.map((cartitem, key) => {
                return (
                    <div key={key} className="singleproduct">
                        <Link to={"/product/" + cartitem.id}>
                            <h3>{cartitem.Name}</h3>
                            <img className="productimage" src={"http://localhost:1337" + cartitem.Image.url} alt="failedtoload" />
                        </Link>
                        <p>({cartitem.Stock} i lager)</p>
                        <h4 className="h4cartprice">{cartitem.Price}:-</h4>
                    </div>
                );
            });
        } else {
            cartlist =
                <div className="singleproduct">
                    <p>CART IS EMPTY</p>

                </div>

        }
        return (
            <div className="maincontainer" >
                <Link to={"/"} className="buttontohome">&lt; Tillbaka</Link>

                {cartlist}
                <div className="margintopcontainer">
                    <button id="emptycart" onClick={this.handleClick}>Empty Cart</button>

                    <div id="makeordercontainer">
                        <form onSubmit={this.makeOrder}>
                            <h3>Make order</h3>
                            <p>Name: </p>
                            <input value={this.state.order.name} onChange={this.handleChangeName} type="text" required></input>
                            <p>Email: </p>
                            <input value={this.state.order.email} onChange={this.handleChangeEmail} type="email" required></input>
                            <p>Adress: </p>
                            <input value={this.state.order.adress} onChange={this.handleChangeAdress} type="text" required></input>
                            <br></br><br></br><button className="putincart">Checkout</button>
                        </form>
                    </div>
                </div>

            </div >
        );


    }
}

export default CartComponent;