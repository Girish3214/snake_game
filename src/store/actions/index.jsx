import {
  INCREASE_SNAKE,
  RESET,
  SET_DISABLED_DIR,
  STOP_GAME,
} from "./actionType";

export const setDisabledDir = (direction) => ({
  type: SET_DISABLED_DIR,
  payload: direction,
});

export const makeMove = (dx, dy, move) => ({
  type: move,
  payload: [dx, dy],
});

export const increaseSnake = () => ({
  type: INCREASE_SNAKE,
});

export const scoreUpdates = (type) => ({
  type,
});

export const stopGame = () => ({
  type: STOP_GAME,
});

export const resetGame = () => ({
  type: RESET,
});
