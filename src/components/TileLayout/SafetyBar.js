import * as React from "react";
import {
    Chart,
    ChartArea,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartCategoryAxisTitle,
    ChartSeries,
    ChartSeriesItem
} from "@progress/kendo-react-charts";
import 'hammerjs';
import {filterBy} from "@progress/kendo-data-query";
import {error, success, very_good, warning} from "./colors";
import {ratherBad, ratherGood, veryBad, veryGood} from "./safety";

const SafetyBar = ({data, gridState}) => {

    const filteredData = filterBy(data, gridState.filter);

    const firstCheckinSafetyVeryGood = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === veryGood).length;
    const firstCheckinSafetyGood = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === ratherGood).length;
    const firstCheckinSafetyBad = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === ratherBad).length;
    const firstCheckinSafetyVeryBad = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === veryBad).length;
    const secondCheckinSafetyVeryGood = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === veryGood).length;
    const secondCheckinSafetyGood = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === ratherGood).length;
    const secondCheckinSafetyBad = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === ratherBad).length;
    const secondCheckinSafetyVeryBad = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === veryBad).length;

    return <Chart style={{height: "100%"}}>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={["First Check-In", "Second Check-In"]}>
                <ChartCategoryAxisTitle/>
            </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartArea background={"white"}/>
        <ChartSeries>
            <ChartSeriesItem type="bar" color={very_good} name={"Very Good"} tooltip={{visible: true,}}
                             data={[firstCheckinSafetyVeryGood, secondCheckinSafetyVeryGood]}/>
            <ChartSeriesItem type="bar" color={success} name={"Good"} tooltip={{visible: true,}}
                             data={[firstCheckinSafetyGood, secondCheckinSafetyGood]}/>
            <ChartSeriesItem type="bar" color={warning} name={"Bad"} tooltip={{visible: true,}}
                             data={[firstCheckinSafetyBad, secondCheckinSafetyBad]}/>
            <ChartSeriesItem type="bar" color={error} name={"Very Bad"} tooltip={{visible: true,}}
                             data={[firstCheckinSafetyVeryBad, secondCheckinSafetyVeryBad]}/>
        </ChartSeries>
    </Chart>;
};


export default SafetyBar;