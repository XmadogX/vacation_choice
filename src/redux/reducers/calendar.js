const initialState = {
    start_day: 0,
    mounts:[[],[],[],[],[],[],[],[],[],[],[],[]]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_DAY": {
            let obj = {...state};
            obj.mounts = obj.mounts.map((val,index)=>action.mount===index+1?[...val,action.day]:[...val]);
            return obj;
        }

        case "DELETE_DAY": {
            let obj = {...state};
            obj.mounts = obj.mounts.map((val,index)=>action.mount===index+1?val.filter((item)=>item!==action.day):[...val]);
            console.log(obj);
            return obj;
        }

        case "ADD_START_DAY": {
            let obj = {...state};
            obj.start_day = action.day;
            console.log(obj);
            return obj;
        }
        default:
        return state;
    }
}