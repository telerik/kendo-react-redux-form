import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

const required = value => value ? undefined : 'Required*'

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue0 = minValue(0)
const minValue1 = minValue(1)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <label className="k-form-field">
    {label !== "ProductID" ? <span>{label}</span> : ""}
    <input {...input} placeholder={label} type={type} className={label === "ProductID" ? "hidden" : "k-textbox"} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </label>
)

let ReduxProductsForm = props => {
  const { handleSubmit, isNew } = props

  return (
    <div className="col-md-4 col-sm-12 col-xs-12">
      <div className="header">
        <h5>Product</h5>
      </div>
      <form onSubmit={handleSubmit} className="k-form">
        <fieldset>
          <Field name="ProductID" component={renderField} type="number" label={"ProductID"} />
          <Field name="ProductName" component={renderField} type="text" label={"Product Name"} validate={[required]} />
          <Field name="UnitPrice" component={renderField} type="number" label={"Unit Price"} validate={[required, minValue1]} />
          <Field name="UnitsInStock" component={renderField} type="number" label={"Units In Stock"} validate={[required, minValue0]} />
          <div className="text-right">
            <button
              type="submit"
              className={"k-button k-primary" + (isNew ? " k-outline" : "")}
            >
              {isNew
                ? "Add new product"
                : "Update"
              }
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

ReduxProductsForm = reduxForm({
  form: 'products'
})(ReduxProductsForm)

ReduxProductsForm = connect(
  state => ({
    initialValues: {},
    isNew: state.selectionReducer.isNew
  })

)(ReduxProductsForm);

export default ReduxProductsForm