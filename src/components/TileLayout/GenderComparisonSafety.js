import React from "react";
import {
    Chart,
    ChartArea,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartCategoryAxisTitle,
    ChartSeries,
    ChartSeriesItem
} from '@progress/kendo-react-charts';
import 'hammerjs';
import {error, success, very_good, warning} from "./colors";
import {ratherBad, ratherGood, veryBad, veryGood} from "./safety";

const GenderComparisonSafety = ({data}) => {
    let firstCheckin = data.filter(d => d.checkIn === 1);
    let firstCheckinMen = firstCheckin.filter(d => d.gender === "M");
    let firstCheckinWomen = firstCheckin.filter(d => d.gender === "W");
    const firstCheckinMenSafetyVeryGood = firstCheckinMen.filter(d => d.safety === veryGood).length;
    const firstCheckinMenSafetyGood = firstCheckinMen.filter(d => d.safety === ratherGood).length;
    const firstCheckinMenSafetyBad = firstCheckinMen.filter(d => d.safety === ratherBad).length;
    const firstCheckinMenSafetyVeryBad = firstCheckinMen.filter(d => d.safety === veryBad).length;
    const firstCheckinWomenSafetyVeryGood = firstCheckinWomen.filter(d => d.safety === veryGood).length;
    const firstCheckinWomenSafetyGood = firstCheckinWomen.filter(d => d.safety === ratherGood).length;
    const firstCheckinWomenSafetyBad = firstCheckinWomen.filter(d => d.safety === ratherBad).length;
    const firstCheckinWomenSafetyVeryBad = firstCheckinWomen.filter(d => d.safety === veryBad).length;
    let secondCheckin = data.filter(d => d.checkIn === 2);
    let secondCheckinMen = secondCheckin.filter(d => d.gender === "M");
    let secondCheckinWomen = secondCheckin.filter(d => d.gender === "W");
    const secondCheckinMenSafetyVeryGood = secondCheckinMen.filter(d => d.safety === veryGood).length;
    const secondCheckinMenSafetyGood = secondCheckinMen.filter(d => d.safety === ratherGood).length;
    const secondCheckinMenSafetyBad = secondCheckinMen.filter(d => d.safety === ratherBad).length;
    const secondCheckinMenSafetyVeryBad = secondCheckinMen.filter(d => d.safety === veryBad).length;
    const secondCheckinWomenSafetyVeryGood = secondCheckinWomen.filter(d => d.safety === veryGood).length;
    const secondCheckinWomenSafetyGood = secondCheckinWomen.filter(d => d.safety === ratherGood).length;
    const secondCheckinWomenSafetyBad = secondCheckinWomen.filter(d => d.safety === ratherBad).length;
    const secondCheckinWomenSafetyVeryBad = secondCheckinWomen.filter(d => d.safety === veryBad).length;

    return <Chart style={{height: "100%"}}>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem
                categories={["First Check-In Men", "First Check-In Women", "Second Check-In Men", "Second Check-In Women"]}>
                <ChartCategoryAxisTitle/>
            </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartArea background={"white"}/>
        <ChartSeries>
            <ChartSeriesItem type="bar" color={very_good} name={"Very Good"} tooltip={{visible: true,}}
                             stack={{type: '100%'}}
                             data={[firstCheckinMenSafetyVeryGood, firstCheckinWomenSafetyVeryGood, secondCheckinMenSafetyVeryGood, secondCheckinWomenSafetyVeryGood]}/>
            <ChartSeriesItem type="bar" color={success} name={"Good"} tooltip={{visible: true,}}
                             data={[firstCheckinMenSafetyGood, firstCheckinWomenSafetyGood, secondCheckinMenSafetyGood, secondCheckinWomenSafetyGood]}/>
            <ChartSeriesItem type="bar" color={warning} name={"Bad"} tooltip={{visible: true,}}
                             data={[firstCheckinMenSafetyBad, firstCheckinWomenSafetyBad, secondCheckinMenSafetyBad, secondCheckinWomenSafetyBad]}/>
            <ChartSeriesItem type="bar" color={error} name={"Very Bad"} tooltip={{visible: true,}}
                             data={[firstCheckinMenSafetyVeryBad, firstCheckinWomenSafetyVeryBad, secondCheckinMenSafetyVeryBad, secondCheckinWomenSafetyVeryBad]}/>
        </ChartSeries>
    </Chart>;
};

export default GenderComparisonSafety;