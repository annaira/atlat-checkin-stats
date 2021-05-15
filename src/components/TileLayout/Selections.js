import * as React from 'react';
import factories from "../../factories.json";
import {DropDownList} from "@progress/kendo-react-dropdowns";

const CheckinGrid = ({setSelectedFactory, setSelectedGender, gridState, setGridState}) => {

    const handleDropDownChangeFactory = (e) => {
        const index = gridState.filter.filters.findIndex(f => f.field === "factoryID");
        if (e.target.value.factoryID !== null) {
            if (index === -1) {
                let newGridstate = gridState;
                newGridstate.filter.filters = newGridstate.filter.filters.concat({
                    field: 'factoryID',
                    operator: 'eq',
                    value: e.target.value.factoryID
                });
                setGridState(newGridstate);
            } else {
                let newGridstate = gridState;
                newGridstate.filter.filters[index] = {
                    field: 'factoryID',
                    operator: 'eq',
                    value: e.target.value.factoryID
                };
                setGridState(newGridstate);
            }
        } else {
            if (index !== -1) {
                let newGridstate = gridState;
                newGridstate.filter.filters.splice(index, 1);
                setGridState(newGridstate);
            }
        }
        setSelectedFactory(e.target.value.factoryID);
    };

    const handleDropDownChangeGender = (e) => {
        const index = gridState.filter.filters.findIndex(f => f.field === "gender");
        if (e.target.value.genderID !== null) {
            if (index === -1) {
                let newGridstate = gridState;
                newGridstate.filter.filters = newGridstate.filter.filters.concat({
                    field: 'gender',
                    operator: 'eq',
                    value: e.target.value.genderID
                });
                setGridState(newGridstate);
            } else {
                let newGridstate = gridState;
                newGridstate.filter.filters[index] = {field: 'gender', operator: 'eq', value: e.target.value.genderID};
                setGridState(newGridstate);
            }
        } else {
            if (index !== -1) {
                let newGridstate = gridState;
                newGridstate.filter.filters.splice(index, 1);
                setGridState(newGridstate);
            }
        }
        setSelectedGender(e.target.value.genderID);
    };

    return <>

        Factory: <DropDownList
        data={factories}
        dataItemKey="factoryID"
        textField="factoryName"
        defaultItem={{factoryID: null, factoryName: "Factories"}}
        onChange={handleDropDownChangeFactory}
    />
        <br/>
        <br/>
        Gender: <DropDownList
        data={[
            {"genderID": 'W', "genderName": "Woman"},
            {"genderID": 'M', "genderName": "Man"},
            {"genderID": 'D', "genderName": "Other"},
        ]}
        dataItemKey="genderID"
        textField="genderName"
        defaultItem={{genderID: null, genderName: "Genders"}}
        onChange={handleDropDownChangeGender}
    />
    </>;
};

export default CheckinGrid;