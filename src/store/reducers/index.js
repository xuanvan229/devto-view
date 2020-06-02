import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {app, subapp} from "../../pages";
import * as combine from "../../utils/config";
import { baseApp } from "./baseReducer";
const combineReduce = combine.combineReducer(app);
const combineSubReduce = combine.combineReducer(subapp);
const rootReducer = (history) =>
  combineReducers({
    ...combineReduce,
    ...combineSubReduce,
    router: connectRouter(history),
    baseApp,
  });

export default rootReducer;
