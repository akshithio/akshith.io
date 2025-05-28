import React, { useCallback, useEffect, useState } from "react";

const BASE_ASCII_ART = String.raw`
                        .,,uod8B8bou,,.
              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
         !...:!TVBBBRPFT||||||||||!!^^""'   ||||
         !.......:!?|||||!!^^""'            ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
        \`.........||||                   ,||||
          .;.......||||               _.-!!|||||
   .,uodWBBBBb.....||||       _.-!!|||||||||!:'
!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....
!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   \`.
!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     \`.
!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"\`;:::       \`.
!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.
\`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.
  \`..........:::::::::::::::::::::::;iof688888888888b.     \`YBBBP^'
    \`........::::::::::::::::;iof68888888888888888888b.     \`
      \`......:::::::::;iof68888888888888888888888888888b.
        \`....:::;iof68888888888888888888888888888888899fT!
          \`..::!8888888888888888888888888888899fT|!^"'
            \`' !!988888888888888888888888899fT|!^"'
                \`!!8888888888888888899fT|!^"'
                  \`!988888888899fT|!^"'
                    \`!9899fT|!^"'
                      \`!^"'
`;

const SCREEN_START_LINE_INDEX = 5;
const SCREEN_END_LINE_INDEX = 13;
const SCREEN_START_COL_INDEX = 18;
const SCREEN_END_COL_INDEX = 42;

const GAME_HEIGHT = SCREEN_END_LINE_INDEX - SCREEN_START_LINE_INDEX + 1;
const GAME_WIDTH = SCREEN_END_COL_INDEX - SCREEN_START_COL_INDEX + 1;

const SNAKE_CHAR = "■";
const FOOD_CHAR = "●";
const EMPTY_SCREEN_CHAR = " ";
const INITIAL_GAME_SPEED_MS = 200;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GameState = "START" | "PLAYING" | "GAME_OVER";

const INITIAL_SNAKE_POSITION: Point[] = [
  { x: Math.floor(GAME_WIDTH / 2), y: Math.floor(GAME_HEIGHT / 2) },
];

let initialFoodX = Math.floor(GAME_WIDTH / 2) + 2;
let initialFoodY = Math.floor(GAME_HEIGHT / 2);
if (initialFoodX >= GAME_WIDTH) initialFoodX = GAME_WIDTH - 1;
if (
  initialFoodX === INITIAL_SNAKE_POSITION[0]!.x &&
  initialFoodY === INITIAL_SNAKE_POSITION[0]!.y
) {
  initialFoodX = (initialFoodX + 1) % GAME_WIDTH;
}

const INITIAL_FOOD_POSITION: Point = { x: initialFoodX, y: initialFoodY };

const getRandomPosition = (snakeBody: Point[] = []): Point => {
  let position: Point;
  do {
    position = {
      x: Math.floor(Math.random() * GAME_WIDTH),
      y: Math.floor(Math.random() * GAME_HEIGHT),
    };
  } while (
    snakeBody.some(
      (segment) => segment.x === position.x && segment.y === position.y,
    )
  );
  return position;
};

const renderGameToAscii = (
  snake: Point[],
  food: Point,
  gameState: GameState,
  score: number,
): string => {
  const baseLines = BASE_ASCII_ART.split("\n");
  const gameScreenGrid: string[][] = Array.from({ length: GAME_HEIGHT }, () =>
    Array(GAME_WIDTH).fill(EMPTY_SCREEN_CHAR),
  );

  if (gameState === "START") {
    const titleMsg = "SNEK";
    const controlsMsg1 = "Use WASD to move";
    const startMsg = "Press SPACE to start";

    const centerY = Math.floor(GAME_HEIGHT / 2) - 2;

    const drawText = (text: string, y: number) => {
      const textX = Math.floor((GAME_WIDTH - text.length) / 2);
      if (y >= 0 && y < GAME_HEIGHT) {
        for (let i = 0; i < text.length; i++) {
          if (textX + i >= 0 && textX + i < GAME_WIDTH) {
            if (gameScreenGrid[y]) {
              gameScreenGrid[y][textX + i] = text[i] ?? "";
            }
          }
        }
      }
    };

    drawText(titleMsg, centerY);
    drawText(controlsMsg1, centerY + 2);
    drawText(startMsg, centerY + 4);
  } else if (gameState === "GAME_OVER") {
    const gameOverMsg = "GAME OVER";
    const scoreMsg = `Score: ${score}`;
    const restartMsg = "Press R";
    const msgY = Math.floor(GAME_HEIGHT / 2) - 1;
    const scoreY = msgY + 1;
    const restartY = msgY + 2;

    const drawText = (text: string, y: number) => {
      const textX = Math.floor((GAME_WIDTH - text.length) / 2);
      if (y >= 0 && y < GAME_HEIGHT) {
        for (let i = 0; i < text.length; i++) {
          if (textX + i >= 0 && textX + i < GAME_WIDTH) {
            if (gameScreenGrid[y]) {
              gameScreenGrid[y][textX + i] = text[i] ?? "";
            }
          }
        }
      }
    };

    drawText(gameOverMsg, msgY);
    drawText(scoreMsg, scoreY);
    drawText(restartMsg, restartY);
  } else {
    if (
      food.y >= 0 &&
      food.y < GAME_HEIGHT &&
      food.x >= 0 &&
      food.x < GAME_WIDTH
    ) {
      gameScreenGrid[food.y]![food.x] = FOOD_CHAR;
    }
    snake.forEach((segment) => {
      if (
        segment.y >= 0 &&
        segment.y < GAME_HEIGHT &&
        segment.x >= 0 &&
        segment.x < GAME_WIDTH
      ) {
        gameScreenGrid[segment.y]![segment.x] = SNAKE_CHAR;
      }
    });
  }

  for (let i = 0; i < GAME_HEIGHT; i++) {
    const lineIndexInAscii = SCREEN_START_LINE_INDEX + i;
    if (lineIndexInAscii < baseLines.length) {
      const line = baseLines[lineIndexInAscii];
      if (line !== undefined) {
        const lineChars = line.split("");
        for (let j = 0; j < GAME_WIDTH; j++) {
          const colIndexInAscii = SCREEN_START_COL_INDEX + j;
          if (colIndexInAscii < lineChars.length) {
            lineChars[colIndexInAscii] = gameScreenGrid[i]?.[j] ?? "";
          }
        }
        baseLines[lineIndexInAscii] = lineChars.join("");
      }
    }
  }
  return baseLines.join("\n");
};

const Snake: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("START");
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Point>(INITIAL_FOOD_POSITION);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [pendingDirection, setPendingDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED_MS);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(getRandomPosition(INITIAL_SNAKE_POSITION));
    setDirection("RIGHT");
    setPendingDirection("RIGHT");
    setScore(0);
    setGameSpeed(INITIAL_GAME_SPEED_MS);
    setGameState("PLAYING");
  }, []);

  const gameLoop = useCallback(() => {
    if (gameState !== "PLAYING" || !isClientReady) return;

    setDirection(pendingDirection);

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const firstSegment = newSnake[0];

      if (!firstSegment) {
        setGameState("GAME_OVER");
        return prevSnake;
      }

      let head: Point = { x: firstSegment.x, y: firstSegment.y };

      switch (pendingDirection) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      if (
        head.x < 0 ||
        head.x >= GAME_WIDTH ||
        head.y < 0 ||
        head.y >= GAME_HEIGHT
      ) {
        setGameState("GAME_OVER");
        return prevSnake;
      }

      for (let i = 1; i < newSnake.length; i++) {
        const segment = newSnake[i];
        if (segment && segment.x === head.x && segment.y === head.y) {
          setGameState("GAME_OVER");
          return prevSnake;
        }
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 1);
        setFood(getRandomPosition(newSnake));
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [gameState, food, pendingDirection, isClientReady]);

  useEffect(() => {
    if (gameState !== "PLAYING" || !isClientReady) return;
    const timer = setInterval(gameLoop, gameSpeed);
    return () => clearInterval(timer);
  }, [gameLoop, gameSpeed, gameState, isClientReady]);

  useEffect(() => {
    if (!isClientReady) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === "START" && (e.key === " " || e.code === "Space")) {
        resetGame();
        return;
      }

      if (gameState === "GAME_OVER" && (e.key === "r" || e.key === "R")) {
        resetGame();
        return;
      }

      if (gameState !== "PLAYING") return;

      let newPendingDirection = pendingDirection;

      switch (e.key) {
        case "w":
        case "W":
          if (direction !== "DOWN") newPendingDirection = "UP";
          break;
        case "s":
        case "S":
          if (direction !== "UP") newPendingDirection = "DOWN";
          break;
        case "a":
        case "A":
          if (direction !== "RIGHT") newPendingDirection = "LEFT";
          break;
        case "d":
        case "D":
          if (direction !== "LEFT") newPendingDirection = "RIGHT";
          break;
      }
      setPendingDirection(newPendingDirection);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameState, resetGame, pendingDirection, isClientReady]);

  const asciiToDisplay = renderGameToAscii(snake, food, gameState, score);

  return (
    <div className="flex flex-col items-center">
      <pre className="p-5 font-mono text-[0.5rem] desktop-xl:text- leading-none whitespace-pre">
        {asciiToDisplay}
      </pre>
    </div>
  );
};

export default Snake;
