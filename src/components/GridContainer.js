import React from 'react';
import { connect } from 'react-redux';
import { productUpdated, productDelete } from '../actions/index';
import MyCommandCell from './MyCommandCell'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';

class GridContainer extends React.Component {
    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
        this.CommandCell = MyCommandCell(this.remove);
        this.addItem = this.addItem.bind(this);
        this.rowClick = this.rowClick.bind(this)
    }

    addItem() {
        this.props.addProduct();
    }

    remove(dataItem) {
        this.props.productDeleted(dataItem);
    }

    rowClick(event) {
        this.props.changeSelected(event.dataItem);
    }

    render() {
        return (
            <div className="grid-container col-md-8 col-sm-12 col-xs-12">
                <div className="header">
                    <h5>Data</h5>
                </div>
                <Grid
                    rowClick={this.rowClick}
                    style={{ maxHeight: "600px" }}
                    data={this.props.products}
                    rowRender={(row, dataItem) => dataItem["ProductID"] === this.props.selectedRow
                        ? React.cloneElement(
                            row,
                            { ...row.props, style: {backgroundColor: "#ff6b58", color: "white" } },
                            row.props.children
                            )
                        : row
                    }
                >
                    <GridToolbar>
                        <button
                            title="Add new"
                            className="k-button k-primary"
                            onClick={this.addItem}
                            disabled={this.props.isNew}
                        >
                            Add new
                        </button>
                    </GridToolbar>
                    <Column field="ProductID" title="ID" width="40px" />
                    <Column field="ProductName" title="Name" width="150px" />
                    <Column field="UnitPrice" title="Price" width="80px" />
                    <Column field="UnitsInStock" title="In stock" width="80px" />
                    <Column cell={this.CommandCell} width="120px" />
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer.products,
        isNew: state.selectionReducer.isNew,
        selectedRow: state.selectionReducer.selectedRow
    }
}

export default connect(mapStateToProps, { productUpdated, productDelete })(GridContainer);
