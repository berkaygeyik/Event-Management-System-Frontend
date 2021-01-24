import {combineReducers} from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import categoryListReducer from "./categoryListReducer";
import eventListReducer from "./eventListReducer";
import eventPageReducer from "./eventPageReducer";

const rootReducer = combineReducers({
    changeCategoryReducer,
    categoryListReducer,
    eventListReducer,
    eventPageReducer
})

export default rootReducer;