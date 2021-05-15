import * as React from 'react';
import {
    Chart,
    ChartArea,
    ChartLegend,
    ChartLegendTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTooltip
} from '@progress/kendo-react-charts';
import 'hammerjs';
import {filterBy} from "@progress/kendo-data-query";
import {error, success, very_good, warning} from "./colors";

const labelContent = e => `${e.category}: \n ${e.value}%`;

const SafetyDonut = ({data, gridState}) => {

    const filteredData = filterBy(data, gridState.filter);

    const firstCheckinSafety = filteredData.filter(d => d.checkIn === 1).length;
    const secondCheckinSafety = filteredData.filter(d => d.checkIn === 2).length;
    const firstCheckinSafetyVeryGood = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "sehr sicher").length;
    const firstCheckinSafetyGood = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "eher sicher").length;
    const firstCheckinSafetyBad = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "eher unsicher").length;
    const firstCheckinSafetyVeryBad = filteredData.filter(d => d.checkIn === 1).filter(d => d.safety === "sehr unsicher").length;
    const secondCheckinSafetyVeryGood = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "sehr sicher").length;
    const secondCheckinSafetyGood = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "eher sicher").length;
    const secondCheckinSafetyBad = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "eher unsicher").length;
    const secondCheckinSafetyVeryBad = filteredData.filter(d => d.checkIn === 2).filter(d => d.safety === "sehr unsicher").length;

    const checkInData = [{
        "name": "First Check-In",
        "data": [{
            "category": "First Check-In - Very Bad",
            "value": Math.round((firstCheckinSafetyVeryBad / firstCheckinSafety) * 100),
            "color": error
        }, {
            "category": "First Check-In - Bad",
            "value": Math.round((firstCheckinSafetyBad / firstCheckinSafety) * 100),
            "color": warning
        }, {
            "category": "First Check-In - Good",
            "value": Math.round((firstCheckinSafetyGood / firstCheckinSafety) * 100),
            "color": success
        }, {
            "category": "First Check-In - Very Good",
            "value": Math.round((firstCheckinSafetyVeryGood / firstCheckinSafety) * 100),
            "color": very_good
        }]
    }, {
        "name": "Second Check-In",
        "data": [{
            "category": "Second Check-In - Very Bad",
            "value": Math.round((secondCheckinSafetyVeryBad / secondCheckinSafety) * 100),
            "color": error
        }, {
            "category": "Second Check-In - Bad",
            "value": Math.round((secondCheckinSafetyBad / secondCheckinSafety) * 100),
            "color": warning
        }, {
            "category": "Second Check-In - Good",
            "value": Math.round((secondCheckinSafetyGood / secondCheckinSafety) * 100),
            "color": success
        }, {
            "category": "Second Check-In - Very Good",
            "value": Math.round((secondCheckinSafetyVeryGood / secondCheckinSafety) * 100),
            "color": very_good
        }]
    }];

    const mapSeries = (series, index, array) => <ChartSeriesItem type="donut" startAngle={90} name={series.name}
                                                                 data={series.data} field="value" key={series.name}
                                                                 categoryField="category" colorField="color">
        {index === array.length - 1 &&
        <ChartSeriesLabels position="outsideEnd" content={labelContent}/>}
    </ChartSeriesItem>;

    return <Chart>
        <ChartTooltip render={context => {
            const {
                category,
                series,
                value
            } = context.point || context;
            return <div>{category} ({series.name}): {value}%</div>;
        }}/>
        <ChartLegend position="left"/>

        <ChartArea/>
        <ChartSeries>
            {checkInData.map(mapSeries)}
        </ChartSeries>
        The inner ring shows the proportional results of the first check-in, and the outher ring shows the
        proportional results from the second check-in.
    </Chart>;
};

export default SafetyDonut;
