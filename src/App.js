import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import factories from './factories.json';
import data from './data.json';
import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn} from '@progress/kendo-react-grid';
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {Window} from '@progress/kendo-react-dialogs';

class App extends Component {

    state = {
        dropdownlistFactory: null,
        gridDataState: {
            sort: [
                {field: "year", dir: "asc"}
            ],
            skip: 0,
            take: 10
        },
        windowVisible: false,
        gridClickedRow: {}
    };

    handleDropDownChange = (e) => {
        let newDataState = {...this.state.gridDataState};
        if (e.target.value.factoryID !== null) {
            newDataState.filter = {
                logic: 'and',
                filters: [{field: 'factoryID', operator: 'eq', value: e.target.value.factoryID}]
            };
            newDataState.skip = 0
        } else {
            newDataState.filter = [];
            newDataState.skip = 0
        }
        this.setState({
            dropdownlistFactory: e.target.value.factoryID,
            gridDataState: newDataState
        });
    };

    handleGridDataStateChange = (e) => {
        this.setState({gridDataState: e.dataState});
    };

    handleGridRowClick = (e) => {
        this.setState({
            windowVisible: true,
            gridClickedRow: e.dataItem
        });
    };

    closeWindow = (e) => {
        this.setState({
            windowVisible: false
        });
    };

    render() {
        return (
            <div className="App">
                <h1>Hello KendoReact!</h1>
                <p>
                    <DropDownList
                        data={factories}
                        dataItemKey="factoryID"
                        textField="factoryName"
                        defaultItem={{factoryID: null, factoryName: "Factories"}}
                        onChange={this.handleDropDownChange}
                    />
                    &nbsp; Selected factory ID: <strong>{this.state.dropdownlistFactory}</strong>
                </p>

                <Grid
                    data={process(data, this.state.gridDataState)}
                    pageable={true}
                    sortable={true}
                    onRowClick={this.handleGridRowClick}
                    {...this.state.gridDataState}
                    onDataStateChange={this.handleGridDataStateChange}
                    style={{height: "400px"}}>
                    <GridColumn field="factoryID" title="Factory ID"/>
                    <GridColumn field="factoryName" title="Factory Name"/>
                    <GridColumn field="year" title="Hired in (year)"/>
                    <GridColumn field="paid" title="Full Payment on time"/>
                    <GridColumn field="overtime" title="Overtime (hours)"/>
                    <GridColumn field="unpaid_overtime" title="Unpaid Overtime (hours)"/>
                    <GridColumn field="age" title="age"/>
                    <GridColumn field="gender" title="gender"/>
                    <GridColumn field="safety" title="safety"/>
                </Grid>
                {this.state.windowVisible &&
                <Window
                    title="Check-In Data"
                    onClose={this.closeWindow}
                    height={250}>
                    <dl style={{textAlign: "left"}}>
                        <dt>Product Name</dt>
                        <dd>{this.state.gridClickedRow.factory}</dd>
                        <dt>Product ID</dt>
                        <dd>{this.state.gridClickedRow.year}</dd>
                        <dt>Quantity per Unit</dt>
                        <dd>{this.state.gridClickedRow.paid}</dd>
                    </dl>
                </Window>
                }
            </div>
        );
    }
}

class checkboxColumn extends Component {
    render() {
        return (
            <td>
                <input type="checkbox" checked={this.props.dataItem[this.props.field]} disabled="disabled"/>
            </td>
        );
    }
}

export default App;