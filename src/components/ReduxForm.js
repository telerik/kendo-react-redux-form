import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Input, NumericTextBox, Switch } from '@progress/kendo-react-inputs'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';

const required = value => value ? undefined : 'Required*';

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue0 = minValue(0);
const minValue1 = minValue(1);

const kendoHOC = (type, {input: {value, onChange, onBlur}, meta, label, ...rest}) => {
    const Type = type;

    return <label className="k-form-field">
        <span>{label}</span>
        <Type
            value={value}
            onChange={(event) => onChange(event.value)}
            onBlur={(event) => onBlur(event.value)}
            {...rest}
        />
        {meta.error && meta.touched && <span className="k-required">{meta.error}</span>}
    </label>;
};

const KendoInput = (options) => (kendoHOC(Input, options))
const KendoNumericTextBox = (options) => (kendoHOC(NumericTextBox, options))
const KendoDatePicker = (options) => (kendoHOC(DatePicker, options))
const KendoDropDown = (options) => (kendoHOC(DropDownList, options))
const KendoSwitch = (options) => (kendoHOC(Switch, options))

let ReduxProductsForm = props => {
  const { handleSubmit, isNew } = props

  return (
    <div className="col-md-4 col-sm-12 col-xs-12">
      <div className="header">
        <h5>Product</h5>
      </div>
      <form className="k-form" >
        <fieldset>
          <Field
            name="ProductID"
            component={KendoInput}
            type="number"
            label={"ProductID"}
            disabled={true}
          />
          <Field
            name="ProductName"
            component={KendoInput}
            type="text"
            label={"Product Name"}
            validate={[required]} />
          <Field
            name="UnitPrice"
            component={KendoNumericTextBox}
            type="number"
            label={"Unit Price"}
            validate={[required, minValue1]}
          />
          <Field
            name="UnitsInStock"
            component={KendoNumericTextBox}
            type="number"
            label={"Units In Stock"}
            validate={[required, minValue0]}
          />
          <div className="text-right">
            <Button
              type="submit"
              onClick={handleSubmit}
              primary={true}
              look={isNew ? 'outline'  : null}
            >
              {isNew
                ? "Add new product"
                : "Update"
              }
            </Button>
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
    initialValues: {UnitPrice: 0, UnitsInStock: 0},
    isNew: state.selectionReducer.isNew
  })

)(ReduxProductsForm);

export default ReduxProductsForm