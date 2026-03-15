import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Trophy, Star, Coins } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  achieved: boolean;
  icon: JSX.Element;
}

interface Obstacle {
  id: number;
  left: number;
  gap: number;
  height: number;
}

interface Coin {
  id: number;
  position: { x: number; y: number };
  collected: boolean;
}

interface Star {
  id: number;
  position: { x: number; y: number };
  collected: boolean;
}

const FlyCoinGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("flyCoinGameHighScore");
      return savedHighScore ? parseInt(savedHighScore, 10) : 0;
    }
    return 0;
  });
  const [birdPosition, setBirdPosition] = useState(300);
  const birdVelocityRef = useRef(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const [coins, setCoins] = useState<Coin[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [starsCollected, setStarsCollected] = useState(0);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const playJump = () =>
    !mutedRef.current &&
    typeof window !== "undefined" &&
    new Audio("/jump.mp3").play().catch(() => {});
  const playCollect = () =>
    !mutedRef.current &&
    typeof window !== "undefined" &&
    new Audio("/collect.mp3").play().catch(() => {});
  const playGameOver = () =>
    !mutedRef.current &&
    typeof window !== "undefined" &&
    new Audio("/gameover.mp3").play().catch(() => {});

  const gravity = 0.4;
  const jumpSpeed = -7;
  const terminalVelocity = 8;
  const obstacleWidth = 60;
  const birdWidth = 40;
  const birdHeight = 40;
  const gameSpeed = 4;
  const gameHeight = 700;
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-10",
      name: "Getting Started",
      description: "Score 10 points",
      achieved: false,
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "coin-collector",
      name: "Coin Collector",
      description: "Collect 10 coins",
      achieved: false,
      icon: <Coins className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "star-collector",
      name: "Star Gazer",
      description: "Collect 5 stars",
      achieved: false,
      icon: <Star className="w-6 h-6 text-yellow-400" />,
    },
  ]);

  const generateObstacle = (leftPos: number): Obstacle => {
    const newGap = Math.floor(Math.random() * 80) + 180; // Gap between 180 and 260
    const minHeight = 50;
    const maxHeight = gameHeight - newGap - minHeight;
    const newHeight =
      Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    return {
      id: Math.random(),
      left: leftPos,
      gap: newGap,
      height: newHeight,
    };
  };

  useEffect(() => {
    let loopId: ReturnType<typeof setInterval>;
    if (gameStarted && !gameOver) {
      loopId = setInterval(() => {
        birdVelocityRef.current = Math.min(
          birdVelocityRef.current + gravity,
          terminalVelocity,
        );
        const curVel = birdVelocityRef.current;

        setBirdPosition((prev) => {
          let newPos = prev + curVel;
          if (newPos >= gameHeight - birdHeight || newPos <= 0) {
            newPos = Math.max(0, Math.min(newPos, gameHeight - birdHeight));
            setGameOver((prevGameOver) => {
              if (!prevGameOver) playGameOver();
              return true;
            });
          }
          return newPos;
        });

        setBirdRotation(Math.min(Math.max(curVel * 4, -25), 90));

        setObstacles((prev) => {
          let updated = prev.map((obs) => ({
            ...obs,
            left: obs.left - gameSpeed,
          }));
          const onScreen = updated.filter((obs) => obs.left > -obstacleWidth);
          if (updated.length > onScreen.length) {
            setScore((s) => s + (updated.length - onScreen.length));
          }
          if (
            onScreen.length === 0 ||
            onScreen[onScreen.length - 1].left < 800 - 300
          ) {
            onScreen.push(generateObstacle(800));
          }
          return onScreen;
        });

        setCoins((prev) =>
          prev
            .map((c) => ({
              ...c,
              position: { ...c.position, x: c.position.x - gameSpeed },
            }))
            .filter((c) => c.position.x > -20 && !c.collected),
        );

        setStars((prev) =>
          prev
            .map((s) => ({
              ...s,
              position: { ...s.position, x: s.position.x - gameSpeed },
            }))
            .filter((s) => s.position.x > -20 && !s.collected),
        );
      }, 24);
    }
    return () => clearInterval(loopId);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    let spawnId: ReturnType<typeof setInterval>;
    if (gameStarted && !gameOver) {
      spawnId = setInterval(() => {
        if (Math.random() > 0.5) {
          setCoins((prev) => [
            ...prev,
            {
              id: Math.random(),
              position: { x: 800, y: Math.random() * 500 + 50 },
              collected: false,
            },
          ]);
        } else {
          setStars((prev) => [
            ...prev,
            {
              id: Math.random(),
              position: { x: 800, y: Math.random() * 500 + 50 },
              collected: false,
            },
          ]);
        }
      }, 2000);
    }
    return () => clearInterval(spawnId);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    // Forgiving hitbox by trimming 5 pixels off each edge
    const padding = 5;
    const birdLeft = 100 + padding;
    const birdRight = 100 + birdWidth - padding;
    const birdTop = birdPosition + padding;
    const birdBottom = birdPosition + birdHeight - padding;

    const hitObstacle = obstacles.some((obs) => {
      const hitHorizontal =
        obs.left <= birdRight && obs.left + obstacleWidth >= birdLeft;
      const hitVertical =
        birdTop <= obs.height || birdBottom >= obs.height + obs.gap;
      return hitHorizontal && hitVertical;
    });

    if (hitObstacle) {
      setGameOver((prev) => {
        if (!prev) playGameOver();
        return true;
      });
      return;
    }

    let newCoins = 0;
    const updatedCoins = coins.map((c) => {
      if (c.collected) return c;
      const hit =
        c.position.x <= birdRight &&
        c.position.x + 20 >= 100 &&
        c.position.y <= birdBottom &&
        c.position.y + 20 >= birdPosition;
      if (hit) newCoins++;
      return hit ? { ...c, collected: true } : c;
    });

    if (newCoins > 0) {
      playCollect();
      setCoinsCollected((prev) => prev + newCoins);
      setCoins(updatedCoins);
    }

    let newStars = 0;
    const updatedStars = stars.map((s) => {
      if (s.collected) return s;
      const hit =
        s.position.x <= birdRight &&
        s.position.x + 20 >= 100 &&
        s.position.y <= birdBottom &&
        s.position.y + 20 >= birdPosition;
      if (hit) newStars++;
      return hit ? { ...s, collected: true } : s;
    });

    if (newStars > 0) {
      playCollect();
      setStarsCollected((prev) => prev + newStars);
      setStars(updatedStars);
    }
  }, [gameStarted, gameOver, birdPosition, obstacles, coins, stars]);

  useEffect(() => {
    setAchievements((prev) => {
      let changed = false;
      const next = prev.map((a) => {
        if (a.id === "first-10" && score >= 10 && !a.achieved) {
          changed = true;
          return { ...a, achieved: true };
        }
        if (a.id === "coin-collector" && coinsCollected >= 10 && !a.achieved) {
          changed = true;
          return { ...a, achieved: true };
        }
        if (a.id === "star-collector" && starsCollected >= 5 && !a.achieved) {
          changed = true;
          return { ...a, achieved: true };
        }
        return a;
      });
      return changed ? next : prev;
    });
    if (score > highScore) {
      setHighScore(score);
      if (typeof window !== "undefined") {
        localStorage.setItem("flyCoinGameHighScore", score.toString());
      }
    }
  }, [score, highScore, coinsCollected, starsCollected]);

  const handleClickRef = useRef<() => void>();

  const handleClick = () => {
    // Game Over reset
    if (gameOver) {
      setGameStarted(false);
      setGameOver(false);
      setBirdPosition(300);
      birdVelocityRef.current = 0;
      setBirdRotation(0);
      setObstacles([]);
      setScore(0);
      setCoins([]);
      setStars([]);
      setCoinsCollected(0);
      setStarsCollected(0);
      return; // Exit here to prevent immediate jump on reset click
    }

    // Start or Jump
    if (!gameStarted) {
      setGameStarted(true);
      setObstacles([generateObstacle(800)]);
    }

    birdVelocityRef.current = jumpSpeed;
    playJump();
  };

  useEffect(() => {
    handleClickRef.current = handleClick;
  }, [handleClick]);

  // Hook up spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling unconditionally
      if (e.code === "Space") {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        // Prevent double firing if focused on the container (which clicks via space normally)
        if (
          document.activeElement !== gameContainerRef.current &&
          document.activeElement?.tagName !== "BUTTON" &&
          handleClickRef.current
        ) {
          handleClickRef.current();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary py-16">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-white text-2xl font-bold">Score: {score}</div>
        <div className="flex items-center gap-2 text-yellow-400">
          <Coins className="w-6 h-6" />
          <span className="text-xl">{coinsCollected}</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Star className="w-6 h-6" />
          <span className="text-xl">{starsCollected}</span>
        </div>
        <div className="text-white text-xl">High Score: {highScore}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMuted(!muted);
          }}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30"
        >
          {muted ? (
            <VolumeX className="text-white" />
          ) : (
            <Volume2 className="text-white" />
          )}
        </button>
      </div>

      <div
        ref={gameContainerRef}
        onClick={handleClick}
        className="relative w-full lg:w-[800px] border-4 border-white rounded-lg overflow-hidden bg-secondary cursor-pointer"
        style={{ height: `${gameHeight}px` }}
      >
        {!gameStarted ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-3xl font-bold">Click to Start</div>
          </div>
        ) : null}

        <div
          className="absolute transition-all duration-100 ease-linear"
          style={{
            width: birdWidth,
            height: birdHeight,
            left: "100px",
            top: `${birdPosition}px`,
            transform: `rotate(${birdRotation}deg)`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Body */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full border-[3px] border-black z-10" />

            {/* Eye */}
            <div className="absolute top-1.5 right-2 w-3.5 h-3.5 bg-white rounded-full border-[2px] border-black z-20">
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-black rounded-full" />
            </div>

            {/* Beak */}
            <div className="absolute top-4 -right-2 w-5 h-3.5 bg-orange-500 border-[2px] border-black rounded-r-full z-10" />

            {/* Wing */}
            <div
              className="absolute top-5 -left-1 w-6 h-4 bg-white border-[2px] border-black rounded-full origin-left transition-transform duration-75 z-20 shadow-sm"
              style={{
                transform:
                  birdVelocityRef.current < 0
                    ? "rotate(-25deg)"
                    : "rotate(15deg)",
              }}
            />
          </div>
        </div>

        {obstacles.map((obs) => (
          <div key={obs.id}>
            <div
              className="absolute bg-green-500"
              style={{
                width: obstacleWidth,
                height: obs.height,
                left: obs.left,
                top: 0,
              }}
            />
            <div
              className="absolute bg-green-500"
              style={{
                width: obstacleWidth,
                height: gameHeight - obs.height - obs.gap,
                left: obs.left,
                top: obs.height + obs.gap,
              }}
            />
          </div>
        ))}

        {stars.map(
          (star) =>
            !star.collected && (
              <div
                key={star.id}
                className="absolute"
                style={{
                  left: `${star.position.x}px`,
                  top: `${star.position.y}px`,
                }}
              >
                <Star className="text-yellow-300 w-5 h-5" />
              </div>
            ),
        )}

        {coins.map(
          (coin) =>
            !coin.collected && (
              <div
                key={coin.id}
                className="absolute"
                style={{
                  left: `${coin.position.x}px`,
                  top: `${coin.position.y}px`,
                }}
              >
                <Coins className="text-yellow-500 w-5 h-5" />
              </div>
            ),
        )}

        {gameOver ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-white text-3xl font-bold">
              Game Over! Click to restart
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-4 bg-white/10 rounded-lg p-4 w-[800px]">
        <div className="text-white font-bold mb-2">Achievements</div>
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                achievement.achieved ? "bg-white/20" : "bg-white/5"
              }`}
            >
              {achievement.icon}
              <div>
                <div className="text-white font-bold">{achievement.name}</div>
                <div className="text-white/80 text-sm">
                  {achievement.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlyCoinGame;
