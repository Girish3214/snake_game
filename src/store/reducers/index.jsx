import {
  DOWN,
  INCREASE_SNAKE,
  INCREMENT_SCORE,
  LEFT,
  RESET_SCORE,
  RIGHT,
  SET_DISABLED_DIR,
  UP,
} from "../actions/actionType";

const globalState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  score: 0,
};

const gameReducer = (state = globalState, action) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake];
      newSnake = [
        {
          x: state.snake[0].x + action.payload[0],
          y: state.snake[0].y + action.payload[1],
        },

        ...newSnake,
      ];
      newSnake.pop();
      return {
        ...state,
        snake: newSnake,
      };
    }

    case SET_DISABLED_DIR:
      return { ...state, disallowedDirection: action.payload };

    case INCREASE_SNAKE:
      const snakeLen = state.snake.length;
      return {
        ...state,
        snake: [
          ...state.snake,
          {
            x: state.snake[snakeLen - 1].x - 20,
            y: state.snake[snakeLen - 1].y - 20,
          },
        ],
      };

    case INCREMENT_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };

    case RESET_SCORE:
      return { ...state, score: 0 };
    default:
      return state;
  }
};

export default gameReducer;
