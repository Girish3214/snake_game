import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseSnake,
  makeMove,
  resetGame,
  scoreUpdates,
  stopGame,
} from "../../store/actions";
import {
  INCREMENT_SCORE,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RESET_SCORE,
} from "../../store/actions/actionType";
import {
  clearCanvas,
  drawSnakeAndApple,
  generateRandomPosition,
  hasSnakeCollided,
} from "../../utils";
import Reset from "./Reset";

const GameBoard = ({ height, width }) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  const snake1 = useSelector((state) => state.snake);
  const disallowedDirection = useSelector((state) => state.disallowedDirection);
  const [context, setContext] = useState(null);

  const [pos, setPos] = useState(
    generateRandomPosition(width - 20, height - 20)
  );
  const [isConsumed, setIsConsumed] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
          case "ArrowUp":
            moveSnake(0, -20, disallowedDirection);
            break;

          case "s":
          case "ArrowDown":
            moveSnake(0, 20, disallowedDirection);
            break;

          case "a":
          case "ArrowLeft":
            moveSnake(-20, 0, disallowedDirection);
            break;

          case "d":
          case "ArrowRight":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          (event.key === "d" || event.key === "ArrowRight")
        ) {
          moveSnake(20, 0, disallowedDirection);
        }
      }
    },
    [disallowedDirection, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keyup", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearCanvas(context);
    drawSnakeAndApple(context, snake1, "#fff098");
    drawSnakeAndApple(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      "#676FA3"
    ); //Draws object randomly
    window.addEventListener("keyup", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
      setIsConsumed(false);

      dispatch(increaseSnake());

      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [isConsumed, pos, height, width, dispatch]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearCanvas(context);
    drawSnakeAndApple(context, snake1, "#fff098");
    drawSnakeAndApple(context, [pos], "#676FA3");

    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
      setIsConsumed(true);
    }

    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x <= 0 ||
      snake1[0].y <= 0 ||
      snake1[0].y >= height
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keyup", handleKeyEvents);
    } else setGameEnded(false);

    return () => {};
  }, [context, pos, snake1, height, width, dispatch, handleKeyEvents]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyEvents);

    return () => {
      window.removeEventListener("keyup", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ border: `3px solid ${gameEnded ? "red" : "black"}` }}
        height={height}
        width={width}
      />
      <Reset resetBoard={resetBoard} />
    </>
  );
};

export default GameBoard;
