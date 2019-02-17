import React, { Component } from 'react';
import { connect } from "react-redux";
import { dellDay,addDay, addStartDay} from "../redux/actions_calendar";

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover_style:{},
            class_day_number:"disabled_day_number",
            class_days_number : {active:"active_day_number",disabled:"disabled_day_number"},
            class_day:"disabled_day",
            class_days : {active:"active_day",disabled:"disabled_day"},
            active:false };
    }
    
    isActive = () => {
        let Selected = day =>{
            if(this.props.select_mount.indexOf(day) === -1){
                
                this.props.addDay(this.props.mount, day)
            }
            else{
                
                this.props.dellDay(this.props.mount, day)
            }
        }
        if(this.props.lcm === true){
            if (this.props.start_day !== 0){
                if (this.props.start_day !== this.props.value){
                    if (this.props.start_day < this.props.value){
                        for (let day = this.props.start_day+1; day <= this.props.value; day++) {
                            Selected(day)
                        }
                    }
                    else{
                        for (let day = this.props.start_day; day > this.props.value; day--) {
                            Selected(day)
                        }
                    }
                }
                else{
                    Selected(this.props.value)
                }
                
            }
            else{
                Selected(this.props.value)
            }
            
        }
    }
    isDown = () => {
        
        if(this.props.lcm === true){
                this.props.addStartDay(this.props.value)
        }
    }
    isClick = () =>{
        if(this.props.active === false){
            
            this.props.addDay(this.props.mount, this.props.value)
        }
        else{
            
            this.props.dellDay(this.props.mount, this.props.value)
        }
    }

    render() {
        return(
            <div>
            <div   className ={"day "+(this.props.active===true?"active_day":"disabled_day")} style={this.state.hover_style}>
                <div className ={"day_number "+(this.props.active===true?"active_day_number":"disabled_day_number")}>
                    {this.props.value}
                </div>
            </div>
            <div className ="click_day" onMouseDown={() => this.isClick()} onMouseOut={()=> this.isDown()} onMouseOver={() => this.isActive() }></div>
            </div>
        )
    }
}

export default connect(null, {dellDay,addDay,addStartDay})(Day);

// onMouseMove={(event)=>console.log(event.ctrlKey)}