import * as React from "react";
import 'hammerjs';
import {filterBy} from "@progress/kendo-data-query";

const Overtime = ({data, gridState}) => {

    const filteredData = filterBy(data, gridState.filter);

    const firstCheckin = filteredData.filter(d => d.checkIn === 1);

    const overtimeFirstCheckin = firstCheckin.map(c => c.overtime).reduce((a, b) => a + b, 0);
    const overtimeFirstCheckinAverage = (overtimeFirstCheckin / firstCheckin.length) || 0;

    const unpaidOvertimeFirstCheckin = firstCheckin.map(c => c.unpaid_overtime).reduce((a, b) => a + b, 0);
    const unpaidOvertimeFirstCheckinAverage = (unpaidOvertimeFirstCheckin / firstCheckin.length) || 0;

    const secondCheckin = filteredData.filter(d => d.checkIn === 2);

    const overtimeSecondCheckin = secondCheckin.map(c => c.overtime).reduce((a, b) => a + b, 0);
    const overtimeSecondCheckinAverage = (overtimeSecondCheckin / secondCheckin.length) || 0;

    const unpaidOvertimeSecondCheckin = secondCheckin.map(c => c.unpaid_overtime).reduce((a, b) => a + b, 0);
    const unpaidOvertimeSecondCheckinAverage = (unpaidOvertimeSecondCheckin / secondCheckin.length) || 0;


    return (
        <div style={{display: "grid", gridTemplateColumns: "175px 175px", padding: 10}}>
            <div><span style={{color: "#ffd246"}}>First Check-In</ span></div>
            <div><span style={{color: "#28b4c8"}}>Second Check-In</span></div>
            <div>{overtimeFirstCheckinAverage.toFixed(2)} hours average overtime</div>
            <div>{overtimeSecondCheckinAverage.toFixed(2)} hours average overtime</div>
            <div>{unpaidOvertimeFirstCheckinAverage.toFixed(2)} hours average unpaid overtime</div>
            <div>{unpaidOvertimeSecondCheckinAverage.toFixed(2)} hours average unpaid overtime</div>
        </div>
    );
};


export default Overtime;