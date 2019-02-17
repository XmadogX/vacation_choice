import React from 'react';
import Mount from "./Mount";

const Mounts = ({mounts,start_day,calendar}) => (
    <div >{mounts.map((val,index)=>(<div key={index}>
        <h2>{val}</h2>
        <h3>{index = index+1}</h3>
        <Mount select_mount={calendar[index-1]} mount={index} start_day={start_day} pre_days={new Date(2019, index-1, 0).getDay()} days={new Date(2019, index, 0).getDate()}/>
    </div>))}</div>
)

export default Mounts;