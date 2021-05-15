import * as React from "react";
import {
    Chart,
    ChartArea,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartValueAxis,
    ChartValueAxisItem, ChartTooltip
} from "@progress/kendo-react-charts";
import {
    ChartLegend,
    ChartTitle,
} from "@progress/kendo-react-charts";

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
            value: 0.2545,
        },
        {
            category: "15-24",
            value: 0.1552,
        },
        {
            category: "25-54",
            value: 0.4059,
        },
        {
            category: "55-64",
            value: 0.0911,
        },
        {
            category: "65+",
            value: 0.0933,
        },
    ];

    return <Chart style={{width:380}}>
        <ChartLegend position="bottom"/>
        <ChartTooltip render={context => {
            const {
                category,
                value
            } = context.point || context;
            return <div>{category} years old: {(value*100).toFixed(1)}%</div>;
        }}/>
        <ChartSeries style={{width:400}}>
            <ChartSeriesItem
                type="pie"
                data={series}
                field="value"
                categoryField="category"
                labels={{
                    visible: true,
                    content: labelContent,
                }}
            />
        </ChartSeries>
    </Chart>;
};

export default AgePie;