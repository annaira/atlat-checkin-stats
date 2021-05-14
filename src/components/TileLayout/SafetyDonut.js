import * as React from 'react';
import {
    Chart,
    ChartArea,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTooltip
} from '@progress/kendo-react-charts';
import 'hammerjs';
import {filterBy} from "@progress/kendo-data-query";

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

    const internetGrowthData = [{
        "name": "First Check-In",
        "data": [{
            "category": "Very Bad",
            "value": Math.round((firstCheckinSafetyVeryBad / firstCheckinSafety) * 100),
            "color": "#90cc38"
        }, {
            "category": "Bad",
            "value": Math.round((firstCheckinSafetyBad / firstCheckinSafety) * 100),
            "color": "#068c35"
        }, {
            "category": "Good",
            "value": Math.round((firstCheckinSafetyGood / firstCheckinSafety) * 100),
            "color": "#006634"
        }, {
            "category": "Very Good",
            "value": Math.round((firstCheckinSafetyVeryGood / firstCheckinSafety) * 100),
            "color": "#004d38"
        }]
    }, {
        "name": "Second Check-In",
        "data": [{
            "category": "Very Bad",
            "value": Math.round((secondCheckinSafetyVeryBad / secondCheckinSafety) * 100),
            "color": "#90cc38"
        }, {
            "category": "Bad",
            "value": Math.round((secondCheckinSafetyBad / secondCheckinSafety) * 100),
            "color": "#068c35"
        }, {
            "category": "Good",
            "value": Math.round((secondCheckinSafetyGood / secondCheckinSafety) * 100),
            "color": "#006634"
        }, {
            "category": "Very Good",
            "value": Math.round((secondCheckinSafetyVeryGood / secondCheckinSafety) * 100),
            "color": "#004d38"
        }]
    }];

    const mapSeries = (series, index, array) => <ChartSeriesItem type="donut" startAngle={150} name={series.name}
                                                                 data={series.data} field="value"
                                                                 categoryField="category" colorField="color">
        {index === array.length - 1 &&
        <ChartSeriesLabels position="outsideEnd" content={labelContent}/>}
    </ChartSeriesItem>;

    const renderTooltip = context => {
        const {
            category,
            series,
            value
        } = context.point || context;
        return <div>{category} ({series.name}): {value}%</div>;
    };

    return <Chart>
        <ChartTooltip render={renderTooltip}/>
        <ChartLegend visible={false}/>
        <ChartArea/>
        <ChartSeries>
            {internetGrowthData.map(mapSeries)}
        </ChartSeries>
    </Chart>;
};

export default SafetyDonut;