import {combineReducers} from "redux";
import {subjectsReducer} from "store/reducers/subjectReducer";
import {settingsReducer} from "store/reducers/settingsReducer";

export default combineReducers({
	subjects: subjectsReducer,
	settings: settingsReducer,
});