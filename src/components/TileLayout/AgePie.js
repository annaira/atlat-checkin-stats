import * as React from "react";
import {Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartTooltip} from "@progress/kendo-react-charts";

const labelContent = (props) => {
    let formatedNumber = Number(props.dataItem.value).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 1,
    });
    return `${props.dataItem.category}:\n ${formatedNumber}`;
};

const AgePie = ({data}) => {

    const series = [
        {
            category: "0-14",
            value: data.filter(r => r.age <= 14).length / data.length,
        },
        {
            category: "15-24",
            value: data.filter(r => r.age >= 14 && r.age <= 24).length / data.length,
        },
        {
            category: "25-34",
            value: data.filter(r => r.age >= 25 && r.age <= 54).length / data.length,
        },
        {
            category: "35-44",
            value: data.filter(r => r.age >= 25 && r.age <= 54).length / data.length,
        },
        {
            category: "45-54",
            value: data.filter(r => r.age >= 25 && r.age <= 54).length / data.length,
        },
        {
            category: "55-64",
            value: data.filter(r => r.age >= 55 && r.age <= 64).length / data.length,
        },
        {
            category: "65+",
            value: data.filter(r => r.age >= 65).length / data.length,
        },
    ];

    return <Chart style={{width: 380}}>
        <ChartLegend position="bottom"/>
        <ChartTooltip render={context => {
            const {
                category,
                value
            } = context.point || context;
            return <div>{category} years old: {(value * 100).toFixed(1)}%</div>;
        }}/>
        <ChartSeries style={{width: 400}}>
            <ChartSeriesItem
                type="pie"
                data={series}
                field="value"
                categoryField="category"
                // labels={{
                //     visible: true,
                //     content: labelContent,
                // }}
            />
        </ChartSeries>
    </Chart>;
};

export default AgePie;