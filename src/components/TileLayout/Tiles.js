import * as React from "react";
import {useState} from "react";
import {TileLayout} from "@progress/kendo-react-layout";
import BubbleNPSYears from "./BubbleNPSYears";
import GenderPie from "./GenderPie";
import SafetyBar from "./SafetyBar";
import SafetyDonut from "./SafetyDonut";
import data from "../../data.json";
import Selections from "./Selections";
import CheckinGrid from "../CheckinGrid/CheckinGrid";
import NPS from "./NPS";
import AgePie from "./AgePie";
import factories from "../../factories.json"
import GenderComparison from "./GenderComparison";
import Overtime from "./Overtime";

const Tiles = () => {
    const [positions, setPositions] = useState([{
        col: 1, // Data Selections
        colSpan: 1,
        rowSpan: 1
    }, {
        col: 1, // Data
        colSpan: 3,
        rowSpan: 2
    }, {
        col: 1, // Work Safety
        colSpan: 2,
        rowSpan: 1
    }, {
        col: 1, // Work Safety (proportional)
        colSpan: 2,
        rowSpan: 2
    }, {
        col: 2, // NPS
        colSpan: 2,
        rowSpan: 1
    }, {
        col: 4, // Age
        colSpan: 1,
        rowSpan: 2
    }, {
        col: 3,
        colSpan: 1,
        rowSpan: 1
    }, {
        col: 4, // GenderPie
        colSpan: 1,
        rowSpan: 2
    }, {
        col: 3, // NPS by years in company
        colSpan: 2,
        rowSpan: 2
    }, {
        col: 3,// Gender Comparison
        colSpan: 3,
        rowSpan: 2
    }]);

    const [selectedFactory, setSelectedFactory] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const [gridState, setGridState] = useState({
        sort: [
            {field: "year", dir: "asc"}
        ],
        filter: {
            logic: "and",
            filters: [],
        },
        skip: 0,
        take: 10
    });

    function getSelectedGender() {
        switch (selectedGender) {
            case "M" :
                return "men";
            case "W" :
                return "women";
            case "O" :
                return "other"
        }
    }

    function getSelectedFactory() {
        return factories.find(f => f.factoryID === selectedFactory).factoryName;
    }

    function getSelectionString() {
        let result = "";
        if (selectedGender || selectedFactory) {
            result += " (";
            result += "only ";
            if (selectedGender) result += getSelectedGender();
            if (selectedGender && selectedFactory) result += " ";
            if (selectedFactory) result += "from " + getSelectedFactory();
            result += ")";
        }
        return result;
    }

    const tiles = [{
        header: "Data Selections",
        body: <Selections setSelectedFactory={setSelectedFactory} setSelectedGender={setSelectedGender}
                          gridState={gridState} setGridState={setGridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Data" + getSelectionString(),
        body: <CheckinGrid data={data} gridState={gridState} setGridState={setGridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Work Safety" + getSelectionString(),
        body: <SafetyBar data={data} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Work Safety (proportional)" + getSelectionString(),
        body: <SafetyDonut data={data} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Net Promoter Scores" + getSelectionString(),
        body: <NPS data={data} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Age",
        body: <AgePie data={data}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Overtime" + getSelectionString(),
        body: <Overtime data={data} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Gender",
        body: <GenderPie data={data}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "NPS by years in company",
        body: <BubbleNPSYears data={data}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Gender Comparison: Safety",
        body: <GenderComparison data={data}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }];

    const handleReposition = e => {
        setPositions(e.value);
        console.log(e.value);
    };

    return <TileLayout columns={4} rowHeight={255} positions={positions} gap={{
        rows: 5, columns: 5
    }} items={tiles} onReposition={handleReposition}/>;
};

export default Tiles;