import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productUpdated, productDelete, productAdd, toggleNew, changeSelect } from './actions/index';
import data from './data/products.json';
import GridContainer from './components/GridContainer'
import ReduxProductsForm from './components/ReduxForm'
import '@progress/kendo-theme-default/dist/all.css';
import { change, reset } from 'redux-form'
import 'bootstrap'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.editedFields = ["ProductID", "ProductName", "UnitPrice", "UnitsInStock"]
    this.dispatch = this.props.dispatch.bind(this);
  }

  submit = value => {
    if (value.ProductID !== undefined) {
      this.dispatch(productUpdated(value));
    } else {
      this.dispatch(productAdd(value));
    }
    for (let i = 0; i <= this.editedFields.length; i++) {
      this.dispatch(reset("products"))
    }
  }

  changeSelected = (val) => {
    this.dispatch(changeSelect(val['ProductID']))

    for (let i = 0; i <= this.editedFields.length; i++) {
      this.dispatch(change("products", this.editedFields[i], val[this.editedFields[i]]))
    }
  }

  addProduct = () => {
    this.dispatch(toggleNew(true))
    this.dispatch(reset("products"))
  }

  productDeleted = (val) => {
    this.dispatch(productDelete(val))
  }

  render() {
    return (
      <div className="App row m-2">
        <ReduxProductsForm onSubmit={this.submit} />
        <GridContainer products={data} changeSelected={this.changeSelected} productDeleted={this.productDeleted} addProduct={this.addProduct} />
      </div>
    );
  }
}

export default connect()(App);
