import * as React from "react";
import {
    Chart,
    ChartArea,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartSeries,
    ChartSeriesItem
} from "@progress/kendo-react-charts";
import ChartCategoryAxisTitle from "@progress/kendo-react-charts/dist/es/components/category-axis-item/Title";
import 'hammerjs';
import {filterBy} from "@progress/kendo-data-query";

const SafetyBar = ({data, gridState}) => {

    const filteredData = filterBy(data, gridState.filter);

    const firstCheckinSafetyVeryGood = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "sehr sicher").length;
    const firstCheckinSafetyGood = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "eher sicher").length;
    const firstCheckinSafetyBad = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "eher unsicher").length;
    const firstCheckinSafetyVeryBad = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "sehr unsicher").length;
    const secondCheckinSafetyVeryGood = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "sehr sicher").length;
    const secondCheckinSafetyGood = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "eher sicher").length;
    const secondCheckinSafetyBad = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "eher unsicher").length;
    const secondCheckinSafetyVeryBad = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "sehr unsicher").length;

    return <Chart style={{height: "100%"}}>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={["First Check-In", "Second Check-In"]}>
                <ChartCategoryAxisTitle/>
            </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartArea background={"white"}/>
        <ChartSeries>
            <ChartSeriesItem type="bar"  name={"Very Good"} tooltip={{    visible: true,}} data={[firstCheckinSafetyVeryGood, secondCheckinSafetyVeryGood]}/>
            <ChartSeriesItem type="bar"  name={"Good"} tooltip={{    visible: true,}} data={[firstCheckinSafetyGood, secondCheckinSafetyGood]}/>
            <ChartSeriesItem type="bar"  name={"Bad"} tooltip={{    visible: true,}} data={[firstCheckinSafetyBad, secondCheckinSafetyBad]}/>
            <ChartSeriesItem type="bar"  name={"Very Bad"} tooltip={{    visible: true,}} data={[firstCheckinSafetyVeryBad, secondCheckinSafetyVeryBad]}/>
        </ChartSeries>
    </Chart>;
};



export default SafetyBar;