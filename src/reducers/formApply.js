export const formApply = (state = false, action) => {
    switch (action.type){
        case "SHOW":
            return action.state;
        case "CLOSE":
            return action.state;
        default:
            return state;
    }
}