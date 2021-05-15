import * as React from "react";
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTooltip,
    ChartXAxis,
    ChartXAxisItem,
    ChartYAxis,
    ChartYAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

const BubbleNPSYears = ({data}) => {

    const allYears = [...new Set(data.map(x => x.year))];
    const allNps = [...new Set(data.map(x => x.nps))];
    const blabla1 = [];
    for (let i = 0; i < allYears.length; i++) {
        const year = allYears[i];
        for (let j = 0; j < allNps.length; j++) {
            const nps = allNps[j];
            blabla1.push({
                "YearsInCompany": 2021 - year,
                "y": nps,
                "size": data.filter(x => x.year === year && x.nps === nps).length,
                "category": "NPS " + nps + " and in company for " + (2021 - year) + " years"
            });
        }
    }

    return (<Chart>
        <ChartSeries>
            <ChartSeriesItem
                type="bubble"
                xField="YearsInCompany"
                yField="y"
                sizeField="size"
                categoryField="category"
                data={blabla1}
            />
        </ChartSeries>
        <ChartXAxis>
            <ChartXAxisItem/>
        </ChartXAxis>
        <ChartYAxis>
            <ChartYAxisItem/>
        </ChartYAxis>
        <ChartLegend visible={true} position="top"/>
        <ChartTooltip opacity={1}/>
    </Chart>);
};

export default BubbleNPSYears;