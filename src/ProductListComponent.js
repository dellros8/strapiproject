import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import axios from 'axios';

class ProductListComponent extends Component {

  constructor() {
    super();
    this.state = {
      productList: [],
      toggleAscDesc: "asc",
      cart: []
    }
    this.sortPrice = this.sortPrice.bind(this);
    this.sortStock = this.sortStock.bind(this);
    this.flipToggl = this.flipToggl.bind(this);
    this.filterCategory = this.filterCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);

    if (localStorage.getItem("cart") === null) {
    } else {
      this.state.cart = JSON.parse(localStorage.getItem("cart"));
    }
  }

  componentDidMount() {
    axios.get('http://localhost:1337/products')
      .then(collection => {
        const newState = collection.data;
        this.setState({ productList: newState });
      })
  }

  filterCategory(category) {

    if (category.target.value === "Alla") {
      axios.get('http://localhost:1337/products')
        .then(collection => {
          const newState = collection.data;
          this.setState({ productList: newState });
        })
    } else {

      let url = 'http://localhost:1337/products?Category=' + category.target.value;
      axios.get(url)
        .then(collection => {
          const newState = collection.data;
          this.setState({ productList: newState });
        })
    }
  }

  flipToggl() {
    let st = "asc";
    if (this.state.toggleAscDesc === "asc") {
      st = "desc";
    }
    this.setState({ toggleAscDesc: st });

  }

  sortPrice() {
    let url = 'http://localhost:1337/products?_sort=Price:' + this.state.toggleAscDesc;
    axios.get(url)
      .then(collection => {
        const newState = collection.data;
        this.setState({ productList: newState });
        this.flipToggl();
      })
  }

  sortStock() {
    let url = 'http://localhost:1337/products?_sort=Stock:' + this.state.toggleAscDesc;
    axios.get(url)
      .then(collection => {
        const newState = collection.data;
        this.setState({ productList: newState });
        this.flipToggl();
      })
  }
  handleClick(product) {
    let newState = this.state.cart.slice(0)

    newState.push(product);

    this.setState({
      cart: newState
    });
    localStorage.setItem("cart", JSON.stringify(newState));
  }

  render() {
    const list = this.state.productList.map((product) => {

      return (
        <ProductComponent key={product.id} handleClick={this.handleClick} product={product} />
      )

    });

    return (
      <div>
        <header id="header">
          <h1>Dellros Dryck</h1>
        </header>
        <div className="maincontainer">
          <div id="filtersortcontainer">
            <div>
              <p>Sortera efter: </p>
              <button onClick={this.sortPrice}>Pris</button>
              <button onClick={this.sortStock}>Lagerstatus</button>

            </div>
            <div>
              <p>Filtrera kategori: </p>
              <select onChange={this.filterCategory}>
                <option value="Alla">Alla</option>
                <option value="Läsk">Läsk</option>
                <option value="Energidrycker">Energidrycker</option>
                <option value="Vatten">Vatten</option>
              </select>
            </div>
            <div>
              <Link to={"/cart"} id="kundvagnbutton">Kundvagn ({this.state.cart.length})</Link>
            </div>
          </div>

          <div id="productlist">
            {list}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListComponent;