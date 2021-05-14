import * as React from "react";
import {useState} from "react";
import {TileLayout} from "@progress/kendo-react-layout";
import {channelUsers, conversions, pageViews, visitors} from "./tileLayout-data";
import ConversionsChart from "./conversions-chart";
import PageViewsChart from "./page-views";
import SafetyBar from "./SafetyBar";
import UsersGrid from "./users-grid";
import VisitorsDonut from "./visitors-donut";
import SafetyDonut from "./SafetyDonut";
import data2 from "../../data.json";
import Selections from "./Selections";
import CheckinGrid from "../CheckinGrid/CheckinGrid";

const Tiles = () => {
    const [positions, setPositions] = useState([{
        col: 1,
        colSpan: 1,
        rowSpan: 1
    }, {
        col: 1,
        colSpan: 3,
        rowSpan: 2
    }, {
        col: 1,
        colSpan: 2,
        rowSpan: 1
    }, {
        col: 1,
        colSpan: 2,
        rowSpan: 2
    }, {
        col: 4,
        colSpan: 1,
        rowSpan: 1
    }, {
        col: 3,
        colSpan: 1,
        rowSpan: 1
    }, {
        col: 3,
        colSpan: 1,
        rowSpan: 1
    }, {
        col: 4,
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


    const tiles = [{
        header: "Data Selections",
        body: <Selections setSelectedFactory={setSelectedFactory} setSelectedGender={setSelectedGender}
                          gridState={gridState} setGridState={setGridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Data",
        body: <CheckinGrid data={data2} gridState={gridState} setGridState={setGridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Work Safety",
        body: <SafetyBar data={data2} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Work Safety (proportional)",
        body: <SafetyDonut data={data2} gridState={gridState}/>,
        style: {padding: "10px", borderRadius: "15px"}
    }, {
        header: "Users by Channel",
        body: <UsersGrid data={channelUsers}/>,
        style: {padding: "10px", borderRadius: "15px"}
        // }, {
        //     header: "Conversion Rate",
        //     body: <div>
        //         <ConversionRate data={channelUsers} />
        //     </div>,
        //         style: {padding: "10px", borderRadius: "20px"}
    }, {

        header: "Page Views",
        body: <PageViewsChart data={pageViews}/>,
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
        header: "Visitors",
        body: <VisitorsDonut data={visitors}/>,
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