import * as actionTypes from "./actionTypes";


export function getEventsSuccess(events){
    return {type: actionTypes.GET_EVENTS_SUCCESS, payload: events}
}

export function getCurrentEvent(event) {
  return { type: actionTypes.GET_CURRENT_EVENT, payload: event };
}

export function getEvents(categoryId) {
  return function(dispatch) {
    let url = "http://localhost:3000/events";
    if(categoryId){
      url = url + "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then(response => response.json())
      .then(result => dispatch(getEventsSuccess(result)));
  };
}