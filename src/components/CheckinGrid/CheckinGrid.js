import * as React from 'react';
import {DropDownList} from "@progress/kendo-react-dropdowns";
import factories from "../../factories.json";
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {process} from "@progress/kendo-data-query";
import data from "../../data.json";
import {Window} from "@progress/kendo-react-dialogs";
import {useState} from "react";

const CheckinGrid = () => {

    const [windowVisible, setWindowVisible] = useState(false);
    const [selectedFactory, setSelectedFactory] = useState(null);
    const [gridClickedRow, setGridClickedRow] = useState({});

    const [gridState, setGridState] = useState({
        gridDataState: {
            sort: [
                {field: "year", dir: "asc"}
            ],
            skip: 0,
            take: 10
        },
    });


    const handleDropDownChange = (e) => {
        let newDataState = {...gridState.gridDataState};
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
        setSelectedFactory(e.target.value.factoryID);
        setGridState({
            gridDataState: newDataState
        });
    };

    const handleGridDataStateChange = (e) => {
        setGridState({gridDataState: e.dataState});
    };

    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    };

    const closeWindow = () => {
        setWindowVisible(false);
    };


    return <>
        <p>
            <DropDownList
                data={factories}
                dataItemKey="factoryID"
                textField="factoryName"
                defaultItem={{factoryID: null, factoryName: "Factories"}}
                onChange={handleDropDownChange}
            />
            &nbsp; Selected factory ID: <strong>{selectedFactory}</strong>
        </p>

        <Grid
            data={process(data, gridState.gridDataState)}
            pageable={true}
            sortable={true}
            onRowClick={handleGridRowClick}
            {...gridState.gridDataState}
            onDataStateChange={handleGridDataStateChange}
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
        {windowVisible &&
        <Window
            title="Check-In Data"
            onClose={closeWindow}
            height={250}>
            <dl style={{textAlign: "left"}}>
                <dt>Product Name</dt>
                <dd>{gridClickedRow.factory}</dd>
                <dt>Product ID</dt>
                <dd>{gridClickedRow.year}</dd>
                <dt>Quantity per Unit</dt>
                <dd>{gridClickedRow.paid}</dd>
            </dl>
        </Window>
        }
    </>;
};

export default CheckinGrid;