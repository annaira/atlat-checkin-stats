import React from "react";
import {
    Chart,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartSeries,
    ChartSeriesItem,
} from "@progress/kendo-react-charts";

import 'hammerjs';

const categories = ["0 - 50 hours", "50 - 100 hours", "100 - 150 hours", "150 - 200 hours", "200 - hours"];

const GenderComparisonOvertime = ({data}) => {

    const women = data.filter(x => x.gender === "W");
    const men = data.filter(x => x.gender === "M");

    const women50 = women.filter(x => x.overtime < 50).length;
    const women100 = women.filter(x => x.overtime >= 50 && x.overtime < 100).length;
    const women150 = women.filter(x => x.overtime >= 100 && x.overtime < 150).length;
    const women200 = women.filter(x => x.overtime >= 150 && x.overtime < 200).length;
    const women250 = women.filter(x => x.overtime >= 200).length;
    const uwomen50 = women.filter(x => x.unpaid_overtime < 50).length;
    const uwomen100 = women.filter(x => x.unpaid_overtime >= 50 && x.unpaid_overtime < 100).length;
    const uwomen150 = women.filter(x => x.unpaid_overtime >= 100 && x.unpaid_overtime < 150).length;
    const uwomen200 = women.filter(x => x.unpaid_overtime >= 150 && x.unpaid_overtime < 200).length;
    const uwomen250 = women.filter(x => x.unpaid_overtime >= 200).length;

    const men50 = men.filter(x => x.overtime < 50).length;
    const men100 = men.filter(x => x.overtime >= 50 && x.overtime < 100).length;
    const men150 = men.filter(x => x.overtime >= 100 && x.overtime < 150).length;
    const men200 = men.filter(x => x.overtime >= 150 && x.overtime < 200).length;
    const men250 = men.filter(x => x.overtime >= 200).length;
    const umen50 = men.filter(x => x.unpaid_overtime < 50).length;
    const umen100 = men.filter(x => x.unpaid_overtime >= 50 && x.unpaid_overtime < 100).length;
    const umen150 = men.filter(x => x.unpaid_overtime >= 100 && x.unpaid_overtime < 150).length;
    const umen200 = men.filter(x => x.unpaid_overtime >= 150 && x.unpaid_overtime < 200).length;
    const umen250 = men.filter(x => x.unpaid_overtime >= 200).length;


    return <Chart>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem
                categories={categories}
            />
        </ChartCategoryAxis>
        <ChartSeries>
            <ChartSeriesItem type="line" data={[women50, women100, women150, women200, women250]} name={"overtime" +
            " women"}/>
            <ChartSeriesItem type="line" data={[uwomen50, uwomen100, uwomen150, uwomen200, uwomen250]} name={"unpaid" +
            " overtime women"}/>
            <ChartSeriesItem type="line" data={[men50, men100, men150, men200, men250]} name={"overtime men"}/>
            <ChartSeriesItem type="line" data={[umen50, umen100, umen150, umen200, umen250]} name={"unpaid" +
            " overtime men"}/>
        </ChartSeries>
    </Chart>;
};

export default GenderComparisonOvertime;