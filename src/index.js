import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';


/*import { createStore } from 'redux';


//Actions
const increment = () => {
    return {
        type: "INCREMENT"
    }
}

const decrement = () => {
    return {
        type: "DECREMENT"
    }
}

//reducers

const counter = (state = 0, action) => {

    // eslint-disable-next-line default-case
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
    }

}


let store = createStore(counter);

//display on the console

store.subscribe(() => {
    console.log(store.getState());
})

//dispatch

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
*/

//axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
