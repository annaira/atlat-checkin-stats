import * as React from 'react';
import {useState} from 'react';
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {process} from "@progress/kendo-data-query";
import {Window} from "@progress/kendo-react-dialogs";

const CheckinGrid = ({data, setGridState, gridState, filter}) => {

    const [windowVisible, setWindowVisible] = useState(false);
    const [gridClickedRow, setGridClickedRow] = useState({});

    const handleGridDataStateChange = (e) => {
        setGridState( e.dataState);
    };

    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    };

    const closeWindow = () => {
        setWindowVisible(false);
    };

    return <>
        <Grid
            data={process(data, gridState)}
            pageable={true}
            sortable={true}
            onRowClick={handleGridRowClick}
            {...gridState}
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