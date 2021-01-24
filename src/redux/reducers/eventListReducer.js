import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function eventListReducer(state=initialState.events,action){
    switch (action.type) {
        case actionTypes.GET_EVENTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}