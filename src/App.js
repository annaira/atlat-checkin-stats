import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import {Calendar} from '@progress/kendo-react-dateinputs'
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import products from './products.json';
class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>Hello KendoReact!</h1>
                <Calendar/>

                <Grid
                    data={products}>
                    <GridColumn field="ProductName" />
                    <GridColumn field="UnitPrice" />
                    <GridColumn field="UnitsInStock" />
                    <GridColumn field="Discontinued" />
                </Grid>

            </div>
        );
    }
}

export default App;
