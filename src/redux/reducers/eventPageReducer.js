import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function eventPageReducer(state=initialState.currentEvent,action){
    switch (action.type) {
        case actionTypes.GET_CURRENT_EVENT:
            return action.payload
        default:
            return state;
    }
}