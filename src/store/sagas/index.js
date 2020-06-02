import { fork, all } from "redux-saga/effects";
import {app, subapp} from "../../pages";
import * as combine from "../../utils/config";

export default function* root() {
  yield all([...combine.combineSagas(app).map(item => fork(item)), ...combine.combineSagas(subapp).map(item => fork(item)) ]);
}
