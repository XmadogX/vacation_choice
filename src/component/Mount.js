import React, { Component } from 'react';
import { connect } from "react-redux";
import {addStartDay} from "../redux/actions_calendar";
import Day from "./Day";

class Mount extends Component {
    constructor(props) {
        super(props);
        this.state = { lcm: false };
    }
    preDays = pre_days => {
        let resp = [];
        for (let i = 1; i <= pre_days; i++) {
            resp.push(<div key={i} className="day" style={{borderColor: "#9e9e9e",backgroundColor:"#f1f1f1"}}></div>)
        }
        return resp;
    }
    Days = days => {
        let resp = [];
        for (let day = 1; day <= days; day++) {
            resp.push(
            <Day 
                key={day} 
                mount={this.props.mount} 
                start_day={this.props.start_day} 
                value={day} lcm={this.state.lcm} 
                select_mount={this.props.select_mount}
                active = {this.props.select_mount.indexOf(day) !== -1? true:false} 
            />)
        }
        return resp;
    }
    downLeftMouse = button => {
        if (button === 0) {
            this.setState({ lcm: true })
        }
    }
    upLeftMouse = button => {
        if (button === 0) {
            this.setState({ lcm: false })
            this.props.addStartDay(0)
        }
    }
    closeLeftMouse = () => {
        this.setState({ lcm: false })
        this.props.addStartDay(0)
    }

    render() {
        return(
            <div className="mount" onMouseLeave={()=>this.closeLeftMouse()} onMouseDown={(event)=>this.downLeftMouse(event.button)} onMouseUp={(event)=>this.upLeftMouse(event.button)} >
            {this.preDays(this.props.pre_days)}{this.Days(this.props.days)}
            </div>
        )
    }
}

export default connect(null, {addStartDay})(Mount);