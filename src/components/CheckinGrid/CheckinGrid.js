import * as React from 'react';
import {useState} from 'react';
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import {process} from "@progress/kendo-data-query";
import {Window} from "@progress/kendo-react-dialogs";
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {Button} from "@progress/kendo-react-buttons";

const CheckinGrid = ({data, setGridState, gridState}) => {

    const [windowVisible, setWindowVisible] = useState(false);
    const [gridClickedRow, setGridClickedRow] = useState({});

    const handleGridDataStateChange = (e) => {
        setGridState(e.dataState);
    };

    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    };

    const closeWindow = () => {
        setWindowVisible(false);
    };

    let _export;

    const excelExport = () => {
        _export.save();
    };


    return <>
        <ExcelExport data={process(data, gridState).data} ref={(exporter) => (_export = exporter)}>
            <Grid
                data={process(data, gridState)}
                pageable={true}
                sortable={true}
                onRowClick={handleGridRowClick}
                {...gridState}
                onDataStateChange={handleGridDataStateChange}
                style={{height: "400px"}}>
                <GridToolbar>
                    <Button icon="file-excel" primary={true} title="Export Excel" onClick={excelExport}>
                        Export to Excel
                    </Button>
                </GridToolbar>
                <GridColumn field="factoryID" title="Factory ID"/>
                <GridColumn field="factoryName" title="Factory Name"/>
                <GridColumn field="year" title="Hired in (year)"/>
                <GridColumn field="paid" title="Full Payment on time"/>
                <GridColumn field="overtime" title="Overtime (hours)"/>
                <GridColumn field="unpaid_overtime" title="Unpaid Overtime (hours)"/>
                <GridColumn field="age" title="Age"/>
                <GridColumn field="gender" title="Gender"/>
                <GridColumn field="safety" title="Safety"/>
                <GridColumn field="nps" title="NPS"/>
            </Grid>
        </ExcelExport>
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