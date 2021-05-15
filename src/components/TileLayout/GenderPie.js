import * as React from "react";
import {Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartTooltip} from "@progress/kendo-react-charts";

const GenderPie = ({data}) => {

    const series = [
        {
            category: "Men",
            value: data.filter(r => r.gender === 'M').length / data.length,
        },
        {
            category: "Women",
            value: data.filter(r => r.gender === 'W').length / data.length,
        },
        {
            category: "Other",
            value: data.filter(r => r.gender === 'D').length / data.length,
        },
    ];

    return <Chart>
        <ChartLegend position="bottom"/>
        <ChartTooltip render={context => {
            const {
                category,
                value
            } = context.point || context;
            return <div>{category}: {(value * 100).toFixed(1)}%</div>;
        }}/>
        <ChartSeries>
            <ChartSeriesItem
                type="pie"
                data={series}
                field="value"
                categoryField="category"
            />
        </ChartSeries>
    </Chart>;
};

export default GenderPie;