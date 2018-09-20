import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import CommentComponent from './CommentComponent';

class SingleProductComponent extends Component {
    constructor() {
        super()
        this.state = {
            item: {
                Image: {},
            },
            comments: [],
            value: {
                name: "",
                text: "",
                rating: ""
            },
            cart: []
        }

        if (localStorage.getItem("cart") === null) {
        } else {
            this.state.cart = JSON.parse(localStorage.getItem("cart"));
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('http://localhost:1337/products/' + id)
            .then(collection => {
                const newState = collection.data
                this.setState({
                    item: newState
                })
            });
        this.getComments()

    }

    getComments() {
        axios.get("http://localhost:1337/comments")
            .then(collection => {
                const newState = collection.data;
                this.setState({
                    comments: newState
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:1337/comments", {
            name: this.state.value.name,
            text: this.state.value.text,
            rating: this.state.value.rating,
            Productid: this.props.match.params.id
        })
            .then(() => {
                this.getComments()
                this.setState({
                    value: {
                        name: "",
                        text: "",
                        rating: ""
                    }
                });
            })

    }

    handleClick() {
        let newState = this.state.cart.slice(0)

        newState.push(this.state.item);

        this.setState({
            cart: newState
        });
        localStorage.setItem("cart", JSON.stringify(newState));
    }

    handleChangeName(event) {
        this.setState({
            value: {
                name: event.target.value,
                text: this.state.value.text,
                rating: this.state.value.rating
            }
        });
    }

    handleChangeText(event) {
        this.setState({
            value: {
                name: this.state.value.name,
                text: event.target.value,
                rating: this.state.value.rating
            }
        });
    }

    handleChangeRating(event) {
        this.setState({
            value: {
                name: this.state.value.name,
                text: this.state.value.text,
                rating: event.target.value
            }
        });
    }


    render() {
        const product = this.state.item;
        const comments = this.state.comments.filter((comment) => {
            return comment.Productid === this.props.match.params.id
        }).map((comment) => {
            return (
                <CommentComponent key={comment.id} comment={comment} />
            )
        });

        let emptycart = "";

        if (this.state.item.Stock < 1) {
            emptycart = <div>

                <button disabled onClick={(event) => {this.props.handleClick(product)}} className="greybutton">Lägg i kundvagn</button>
            </div>
        } else {
            emptycart = <div>

                <button onClick={(event) => {this.props.handleClick(product)}} className="putincart">Lägg i kundvagn</button>
            </div>
            
        };

        return (
            <div className="maincontainer">
                <Link to={"/"} className="buttontohome">&lt; Tillbaka</Link>
                <div className="singlewrapper">

                    <h1>{this.state.item.Name}</h1>
                    <img className="imageinsingle" src={"http://localhost:1337" + product.Image.url} alt="failedtoload" />
                    <p>{product.Description}</p>
                    <div className="stockandpricesingle">
                        <p>({product.Stock} i lager)</p>
                        <h4 className="productpricesingle">{product.Price}:-</h4>
                    </div>
                </div>
                <div className="contentcentered">
                    {emptycart}
                </div>

                <div className="commentcontainer">
                    <h2>Kommentarer</h2>
                    {comments}

                    <h3>Kommentera denna produkt</h3>
                    <form onSubmit={this.handleSubmit}>
                        <p>Namn:</p>
                        <input required type="text" value={this.state.value.name} onChange={this.handleChangeName}></input>
                        <p>Kommentar:</p>
                        <textarea required minLength="5" rows="10" cols="50" value={this.state.value.text} onChange={this.handleChangeText}></textarea>
                        <p>Rating: (1-5)</p>
                        <input required type="number" min="1" max="5" value={this.state.value.rating} onChange={this.handleChangeRating}></input>
                        <button onClick={this.handleClick} className="commentbutton">Lägg kommentar</button>
                    </form>

                </div>

            </div>
        );
    }
}

export default SingleProductComponent;
