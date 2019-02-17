export const dellDay = (mount, day) => {
    return ({
        type: "DELETE_DAY",
        mount: mount,
        day: day
    });
}

export const addDay = (mount, day) => {
    return ({
        type: "ADD_DAY",
        mount: mount,
        day: day
    });
}
export const addStartDay = (day) => {
    return ({
        type: "ADD_START_DAY",
        day: day
    });
}