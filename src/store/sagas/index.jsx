import { setDisabledDir } from "../actions";
import {
  DOWN,
  LEFT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RESET,
  RIGHT,
  STOP_GAME,
  UP,
} from "../actions/actionType";
import { call, delay, put, takeLatest } from "redux-saga/effects";

export function* moveSaga(params) {
  const { type, payload } = params;
  yield { type, payload };
  yield { type, payload: "some string" };
  yield call(() => true);
  while (params.type !== RESET && params.type !== STOP_GAME) {
    yield put({
      type: params.type.split("_")[1],
      payload: params.payload,
    });
    console.log(type, payload);
    switch (params.type.split("_")[1]) {
      case RIGHT:
        yield put(setDisabledDir(LEFT));
        break;

      case LEFT:
        yield put(setDisabledDir(RIGHT));
        break;

      case UP:
        yield put(setDisabledDir(DOWN));
        break;

      case DOWN:
        yield put(setDisabledDir(UP));
        break;
    }
    yield delay(100);
  }
}

function* watcherSagas() {
  yield takeLatest(
    [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET, STOP_GAME],
    moveSaga
  );
}

export default watcherSagas;
