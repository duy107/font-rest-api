export const permission = (state = JSON.parse(localStorage.getItem("permission")) || [], action) => {
    switch(action.type){
        case "permission":
            return action.data;
        default: 
            return state;
    }
}