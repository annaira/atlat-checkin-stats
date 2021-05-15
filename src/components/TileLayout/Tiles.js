import * as React from "react";
import {useState} from "react";
import {TileLayout} from "@progress/kendo-react-layout";
import {conversions} from "./tileLayout-data";
import ConversionsChart from "./conversions-chart";
import GenderPie from "./GenderPie";
import SafetyBar from "./SafetyBar";
import SafetyDonut from "./SafetyDonut";
import data2 from "../../data.json";
import Selections from "./Selections";
import CheckinGrid from "../CheckinGrid/CheckinGrid";
import NPS from "./NPS";
import AgePie from "./AgePie";
import factories from "../../factories.json"

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
        col: 3, // Age
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
        col: 3,
        colSpan: 2,
        rowSpan: 1
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
        body: <CheckinGrid data={data2} gridState={gridState} setGridState={setGridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Work Safety" + getSelectionString(),
        body: <SafetyBar data={data2} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Work Safety (proportional)" + getSelectionString(),
        body: <SafetyDonut data={data2} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Net Promoter Scores" + getSelectionString(),
        body: <NPS data={data2} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
        // }, {
        //     header: "Users by Channel",
        //     body: <UsersGrid data={channelUsers}/>,
        //     style: {padding: "10px", borderRadius: "15px"}
        // }, {
        //     header: "Conversion Rate",
        //     body: <div>
        //         <ConversionRate data={channelUsers} />
        //     </div>,
        //         style: {padding: "10px", borderRadius: "20px"}
    }, {

        header: "Age",
        body: <AgePie data={data2}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Bounce Rate",
        body: <div>
            <h3 style={{
                marginBottom: "-1px",
                marginTop: "-10px"
            }}>55%</h3>
            <p>
                The percentage of all sessions on your site in which users viewed
                only a single page.
            </p>
        </div>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Gender",
        body: <GenderPie data={data2}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Conversions This Month",
        body: <ConversionsChart data={conversions}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }];

    const handleReposition = e => {
        setPositions(e.value);
        console.log(e.value);
    };

    return <TileLayout columns={4} rowHeight={255} positions={positions} gap={{
        rows: 10,
        columns: 10
    }} items={tiles} onReposition={handleReposition}/>;
};

export default Tiles;