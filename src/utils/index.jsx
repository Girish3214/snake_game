export const clearCanvas = (context) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

export const drawSnakeAndApple = (
  context,
  objectBody,
  fillColor,
  strokeStyle = "#146356"
) => {
  if (context) {
    objectBody.forEach((object) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(object.x, object.y, 20, 20);
      context?.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

function randomNumber(min, max) {
  let random = Math.random() * max;
  return random - (random % 20);
}
export const generateRandomPosition = (width, height) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const hasSnakeCollided = (snake, currentHeadPos) => {
  let flag = false;
  snake.forEach((pos, index) => {
    if (
      pos.x === currentHeadPos.x &&
      pos.y === currentHeadPos.y &&
      index !== 0
    ) {
      flag = true;
    }
  });

  return flag;
};
