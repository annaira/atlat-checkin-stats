import * as React from "react";
import 'hammerjs';
import {filterBy} from "@progress/kendo-data-query";
import {LinearGauge} from '@progress/kendo-react-gauges';

const NPS = ({data, gridState}) => {

    const filteredData = filterBy(data, gridState.filter);

    const firstCheckin = filteredData.filter(d => d.checkIn === 1).map(d => d.nps);
    const firstCheckinPromoters = firstCheckin.filter(d => d >= 9).reduce((a, b) => a + b);
    const firstCheckinDetractors = firstCheckin.filter(d => d <= 6).reduce((a, b) => a + b);
    const firstCheckinNPS = ((firstCheckinPromoters - firstCheckinDetractors) / firstCheckin.length) * 100;

    const secondCheckin = filteredData.filter(d => d.checkIn === 2).map(d => d.nps);
    const secondCheckinPromoters = secondCheckin.filter(d => d >= 9).reduce((a, b) => a + b);
    const secondCheckinDetractors = secondCheckin.filter(d => d <= 6).reduce((a, b) => a + b);
    const secondCheckinNPS = ((secondCheckinPromoters - secondCheckinDetractors) / secondCheckin.length) * 100;

    const linearOptions = {
        pointer: [
            {
                value: firstCheckinNPS,
                color: "#ffd246",
                shape: "arrow",
            },
            {
                value: secondCheckinNPS,
                color: "#28b4c8",
                shape: "arrow",
            },
        ],
        scale: {
            minorUnit: 10,
            majorUnit: 50,
            max: 100,
            min: -100,
        },
    };

    return (<div style={{display: 'flex'}}>
        <LinearGauge style={{height: 150}} {...linearOptions}  />
        <p style={{textAlign: "left"}}>Net Promoter or Net Promoter Score (NPS) is a market research metric that
            typically takes the form of a single survey question asking respondents to rate the likelihood that they
            would recommend a company, product, or a service to a friend or colleague. The gauge on the left show
            the <span style={{color: "#ffd246"}}>NPS for the first
        checkin </span> and the <span style={{color: "#28b4c8"}}>NPS for the second
        checkin </span>.</p>
    </div>);
};


export default NPS;