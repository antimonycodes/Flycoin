import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Trophy, Star, Coins } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  achieved: boolean;
  icon: JSX.Element;
}

interface PowerUp {
  id: number;
  type: "shield" | "multiplier" | "slowTime";
  position: { x: number; y: number };
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
    // Initialize high score from local storage
    const savedHighScore = localStorage.getItem("flyCoinGameHighScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [birdPosition, setBirdPosition] = useState(300);
  const [obstacleHeight, setObstacleHeight] = useState(200);
  const [obstacleLeft, setObstacleLeft] = useState(800);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [starsCollected, setStarsCollected] = useState(0);
  const [muted, setMuted] = useState(false);
  const [activeEffects, setActiveEffects] = useState({
    shield: false,
    multiplier: false,
    slowTime: false,
  });

  const gravity = 3;
  const jumpHeight = 70;
  const obstacleWidth = 60;
  const birdWidth = 40;
  const birdHeight = 40;
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Initialize achievements
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

  // Move coins and stars
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const moveItemsInterval = setInterval(() => {
        // Move coins
        setCoins((prevCoins) =>
          prevCoins
            .map((coin) => ({
              ...coin,
              position: { ...coin.position, x: coin.position.x - 5 },
            }))
            .filter((coin) => coin.position.x > -20)
        );

        // Move stars
        setStars((prevStars) =>
          prevStars
            .map((star) => ({
              ...star,
              position: { ...star.position, x: star.position.x - 5 },
            }))
            .filter((star) => star.position.x > -20)
        );
      }, 24);

      return () => clearInterval(moveItemsInterval);
    }
  }, [gameStarted, gameOver]);

  // Spawn coins and stars
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnInterval = setInterval(() => {
        // Spawn a coin
        const newCoin: Coin = {
          id: Date.now(),
          position: {
            x: 800,
            y: Math.random() * 560,
          },
          collected: false,
        };
        setCoins((prevCoins) => [...prevCoins, newCoin]);

        // Spawn a star
        const newStar: Star = {
          id: Date.now() + 1,
          position: {
            x: 800,
            y: Math.random() * 560,
          },
          collected: false,
        };
        setStars((prevStars) => [...prevStars, newStar]);
      }, 3000); // Spawn every 3 seconds

      return () => clearInterval(spawnInterval);
    }
  }, [gameStarted, gameOver]);

  // Collision detection for stars and coins
  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Check collision with coins
      const updatedCoins = coins.map((coin) => {
        const birdRight = 100 + 40; // bird width
        const birdBottom = birdPosition + 40; // bird height
        const coinRight = coin.position.x + 20;
        const coinBottom = coin.position.y + 20;

        const collision =
          !coin.collected &&
          birdRight > coin.position.x &&
          100 < coinRight &&
          birdPosition < coinBottom &&
          birdBottom > coin.position.y;

        if (collision) {
          setCoinsCollected((prev) => prev + 1);
        }

        return collision ? { ...coin, collected: true } : coin;
      });
      setCoins(updatedCoins.filter((coin) => !coin.collected));

      // Check collision with stars (similar logic)
      const updatedStars = stars.map((star) => {
        const birdRight = 100 + 40;
        const birdBottom = birdPosition + 40;
        const starRight = star.position.x + 20;
        const starBottom = star.position.y + 20;

        const collision =
          !star.collected &&
          birdRight > star.position.x &&
          100 < starRight &&
          birdPosition < starBottom &&
          birdBottom > star.position.y;

        if (collision) {
          setStarsCollected((prev) => prev + 1);
        }

        return collision ? { ...star, collected: true } : star;
      });
      setStars(updatedStars.filter((star) => !star.collected));
    }
  }, [gameStarted, gameOver, birdPosition]);

  // Spawn stars and coins at intervals
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnInterval = setInterval(() => {
        // Spawn a star
        const newStar: Star = {
          id: Date.now(),
          position: {
            x: 800,
            y: Math.random() * 560,
          },
          collected: false,
        };
        setStars((prevStars) => [...prevStars, newStar]);

        // Spawn a coin
        const newCoin: Coin = {
          id: Date.now(),
          position: {
            x: 800,
            y: Math.random() * 560,
          },
          collected: false,
        };
        setCoins((prevCoins) => [...prevCoins, newCoin]);
      }, 3000); // Spawn every 3 seconds

      return () => clearInterval(spawnInterval);
    }
  }, [gameStarted, gameOver]);

  // Update high score in local storage
  useEffect(() => {
    // Update high score if current score is higher
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("flyCoinGameHighScore", score.toString());
    }
  }, [score]);

  // Collision detection for stars and coins
  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Check collision with stars
      const updatedStars = stars.map((star) => {
        const birdRight = 100 + birdWidth;
        const birdBottom = birdPosition + birdHeight;
        const starRight = star.position.x + 20; // Assuming star width is 20
        const starBottom = star.position.y + 20; // Assuming star height is 20

        const collision =
          !star.collected &&
          birdRight > star.position.x &&
          100 < starRight &&
          birdPosition < starBottom &&
          birdBottom > star.position.y;

        if (collision) {
          setStarsCollected((prev) => prev + 1);
          // Check star collector achievement
          setAchievements((prev) =>
            prev.map((achievement) =>
              achievement.id === "star-collector" && starsCollected >= 4
                ? { ...achievement, achieved: true }
                : achievement
            )
          );
        }

        return collision ? { ...star, collected: true } : star;
      });
      setStars(updatedStars.filter((star) => !star.collected));

      // Check collision with coins
      const updatedCoins = coins.map((coin) => {
        const birdRight = 100 + birdWidth;
        const birdBottom = birdPosition + birdHeight;
        const coinRight = coin.position.x + 20; // Assuming coin width is 20
        const coinBottom = coin.position.y + 20; // Assuming coin height is 20

        const collision =
          !coin.collected &&
          birdRight > coin.position.x &&
          100 < coinRight &&
          birdPosition < coinBottom &&
          birdBottom > coin.position.y;

        if (collision) {
          setCoinsCollected((prev) => prev + 1);
          // Check coin collector achievement
          setAchievements((prev) =>
            prev.map((achievement) =>
              achievement.id === "coin-collector" && coinsCollected >= 9
                ? { ...achievement, achieved: true }
                : achievement
            )
          );
        }

        return collision ? { ...coin, collected: true } : coin;
      });
      setCoins(updatedCoins.filter((coin) => !coin.collected));
    }
  }, [gameStarted, gameOver, birdPosition]);

  // Existing game logic for bird movement and obstacles (unchanged)
  useEffect(() => {
    let timeId: NodeJS.Timeout;

    if (gameStarted && !gameOver) {
      timeId = setInterval(() => {
        setBirdPosition((position) => position + gravity);

        // Check collision with ground or ceiling
        if (birdPosition >= 560 || birdPosition <= 0) {
          setGameOver(true);
        }
      }, 24);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStarted, gameOver, birdPosition]);

  useEffect(() => {
    let obstacleId: NodeJS.Timeout;

    if (gameStarted && !gameOver) {
      obstacleId = setInterval(() => {
        setObstacleLeft((left) => {
          if (left <= -obstacleWidth) {
            setScore((score) => score + 1);
            return 800;
          }
          return left - 5;
        });
      }, 24);

      return () => {
        clearInterval(obstacleId);
      };
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const hasCollision =
      obstacleLeft >= 100 - birdWidth &&
      obstacleLeft <= 100 + birdWidth &&
      (birdPosition <= obstacleHeight || birdPosition >= obstacleHeight + 150);

    if (hasCollision) {
      setGameOver(true);
    }
  }, [birdPosition, obstacleHeight, obstacleLeft]);

  const handleClick = () => {
    if (!gameStarted) {
      setGameStarted(true);
    } else if (!gameOver) {
      setBirdPosition((position) => position - jumpHeight);
    }
    if (gameOver) {
      setGameStarted(false);
      setGameOver(false);
      setBirdPosition(300);
      setObstacleLeft(800);
      setScore(0);
      setCoins([]);
      setStars([]);
      setCoinsCollected(0);
      setStarsCollected(0);
    }
  };

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
        className="relative w-full lg:w-[800px] h-[600px] border-4 border-white rounded-lg overflow- bg-secndary cursor-pointer"
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
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center transform rotate-0">
            <div className="w-3/4 h-3/4 bg-yellow-400 rounded-full">
              <div className="w-1/4 h-1/4 bg-white rounded-full absolute top-1/4 left-1/4"></div>
            </div>
          </div>
        </div>

        {/* Obstacle blocks remain unchanged */}
        <div
          className="absolute bg-green-500"
          style={{
            width: obstacleWidth,
            height: obstacleHeight,
            // left: obstacleLeft,
            top: 0,
          }}
        />
        <div
          className="absolute bg-green-500"
          style={{
            width: obstacleWidth,
            // height: "100%",
            height: obstacleHeight + 40,

            // left: obstacleLeft,
            top: obstacleHeight + 150,
          }}
        />

        {/* Render stars */}
        {/* {stars.map((star) => (
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
        ))} */}

        {/* Render coins */}
        {/* {coins.map((coin) => (
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
        ))} */}

        {gameOver ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-3xl font-bold">
              Game Over! Click to restart
            </div>
          </div>
        ) : null}
      </div>

      {/* Achievements section */}
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

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Volume2, VolumeX, Trophy, Star, Coins } from "lucide-react";

// interface PowerUp {
//   id: number;
//   type: "shield" | "multiplier" | "slowTime";
//   position: { x: number; y: number };
// }

// interface Coin {
//   id: number;
//   position: { x: number; y: number };
//   collected: boolean;
// }

// interface Achievement {
//   id: string;
//   name: string;
//   description: string;
//   achieved: boolean;
//   icon: JSX.Element;
// }

// const FlyCoinGame = () => {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [highScore, setHighScore] = useState(0);
//   const [birdPosition, setBirdPosition] = useState(300);
//   const [birdRotation, setBirdRotation] = useState(0);
//   const [obstacleHeight, setObstacleHeight] = useState(200);
//   const [obstacleLeft, setObstacleLeft] = useState(800);
//   const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
//   const [coins, setCoins] = useState<Coin[]>([]);
//   const [coinsCollected, setCoinsCollected] = useState(0);
//   const [muted, setMuted] = useState(false);
//   const [activeEffects, setActiveEffects] = useState({
//     shield: false,
//     multiplier: false,
//     slowTime: false,
//   });

//   const gravity = activeEffects.slowTime ? 2 : 3;
//   const jumpHeight = 70;
//   const obstacleWidth = 60;
//   const birdWidth = 40;
//   const birdHeight = 40;
//   const gameSpeed = activeEffects.slowTime ? 3 : 5;

//   const gameContainerRef = useRef<HTMLDivElement>(null);

//   // Sound effects
//   const playJump = () =>
//     !muted && new Audio("/jump.mp3").play().catch(() => {});
//   const playCollect = () =>
//     !muted && new Audio("/collect.mp3").play().catch(() => {});
//   const playGameOver = () =>
//     !muted && new Audio("/gameover.mp3").play().catch(() => {});

//   // Initialize achievements
//   const [achievements, setAchievements] = useState<Achievement[]>([
//     {
//       id: "first-10",
//       name: "Getting Started",
//       description: "Score 10 points",
//       achieved: false,
//       icon: <Trophy className="w-6 h-6 text-yellow-400" />,
//     },
//     {
//       id: "coin-collector",
//       name: "Coin Collector",
//       description: "Collect 10 coins",
//       achieved: false,
//       icon: <Coins className="w-6 h-6 text-yellow-400" />,
//     },
//   ]);

//   const handleGameOver = () => {
//     setGameOver(true);
//     playGameOver();
//     if (score > highScore) {
//       setHighScore(score);
//     }
//   };

//   const resetGame = () => {
//     setGameStarted(false);
//     setGameOver(false);
//     setBirdPosition(300);
//     setObstacleLeft(800);
//     setObstacleHeight(Math.floor(Math.random() * 400));
//     setScore(0);
//     setCoins([]);
//     setCoinsCollected(0);
//     setPowerUps([]);
//     setActiveEffects({
//       shield: false,
//       multiplier: false,
//       slowTime: false,
//     });
//     setBirdRotation(0);
//   };

//   // Bird jump function
//   const handleJump = () => {
//     if (!gameStarted) {
//       setGameStarted(true);
//     } else if (!gameOver) {
//       setBirdPosition((position) => Math.max(0, position - jumpHeight));
//       setBirdRotation(-20);
//       playJump();
//     }
//   };

//   // Handle click events
//   const handleClick = () => {
//     if (gameOver) {
//       resetGame();
//     } else {
//       handleJump();
//     }
//   };

//   // Handle keyboard controls - Fixed implementation
//   useEffect(() => {
//     const handleKeyPress = (event: KeyboardEvent) => {
//       if (event.code === "Space") {
//         event.preventDefault();
//         if (gameOver) {
//           resetGame();
//         } else {
//           handleJump();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [gameStarted, gameOver]); // Add dependencies that affect the jump behavior

//   // Bird movement and collision detection with boundaries
//   useEffect(() => {
//     let timeId: NodeJS.Timeout;

//     if (gameStarted && !gameOver) {
//       timeId = setInterval(() => {
//         setBirdPosition((position) => {
//           const newPosition = position + gravity;
//           if (newPosition >= 560 || newPosition <= 0) {
//             handleGameOver();
//             return position;
//           }
//           return newPosition;
//         });
//         setBirdRotation((rotation) => Math.min(rotation + 2, 45));
//       }, 24);
//     }

//     return () => {
//       if (timeId) clearInterval(timeId);
//     };
//   }, [gameStarted, gameOver, gravity]);

//   // / Add back the spawnCoin function
//   const spawnCoin = () => {
//     if (Math.random() < 0.3) {
//       // Increased spawn chance for better gameplay
//       setCoins((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           position: {
//             x: 800,
//             y: Math.random() * 500,
//           },
//           collected: false,
//         },
//       ]);
//     }
//   };

//   // Add back obstacle movement effect
//   useEffect(() => {
//     let obstacleId: NodeJS.Timeout;

//     if (gameStarted && !gameOver) {
//       obstacleId = setInterval(() => {
//         setObstacleLeft((left) => {
//           if (left >= 100 - birdWidth && left <= 100 + birdWidth) {
//             const birdTop = birdPosition;
//             const birdBottom = birdPosition + birdHeight;

//             if (
//               birdTop <= obstacleHeight ||
//               birdBottom >= obstacleHeight + 150
//             ) {
//               if (!activeEffects.shield) {
//                 handleGameOver();
//               }
//             }
//           }

//           if (left <= -obstacleWidth) {
//             setObstacleHeight(Math.floor(Math.random() * 300) + 100);
//             spawnCoin();
//             setScore((s) => s + 1);
//             return 800;
//           }
//           return left - gameSpeed;
//         });
//       }, 24);
//     }

//     return () => {
//       if (obstacleId) clearInterval(obstacleId);
//     };
//   }, [gameStarted, gameOver, birdPosition, activeEffects.shield, gameSpeed]);

//   // Add back coin movement effect
//   useEffect(() => {
//     let coinId: NodeJS.Timeout;

//     if (gameStarted && !gameOver) {
//       coinId = setInterval(() => {
//         setCoins((prev) =>
//           prev
//             .map((coin) => {
//               if (!coin.collected) {
//                 if (
//                   Math.abs(coin.position.x - 100) < 40 &&
//                   Math.abs(coin.position.y - birdPosition) < 40
//                 ) {
//                   playCollect();
//                   setScore((s) => s + 2);
//                   setCoinsCollected((c) => c + 1);
//                   return { ...coin, collected: true };
//                 }

//                 return {
//                   ...coin,
//                   position: {
//                     ...coin.position,
//                     x: coin.position.x - gameSpeed,
//                   },
//                 };
//               }
//               return coin;
//             })
//             .filter((coin) => coin.position.x > -50 || coin.collected)
//         );
//       }, 24);
//     }

//     return () => {
//       if (coinId) clearInterval(coinId);
//     };
//   }, [gameStarted, gameOver, birdPosition, gameSpeed]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
//       {/* Score Display */}
//       <div className="flex items-center gap-4 mb-4">
//         <div className="text-white text-2xl font-bold">Score: {score}</div>
//         <div className="flex items-center gap-2 text-yellow-400">
//           <Coins className="w-6 h-6" />
//           <span className="text-xl">{coinsCollected}</span>
//         </div>
//         <div className="text-white text-xl">High Score: {highScore}</div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setMuted(!muted);
//           }}
//           className="p-2 rounded-full bg-white/20 hover:bg-white/30"
//         >
//           {muted ? (
//             <VolumeX className="text-white" />
//           ) : (
//             <Volume2 className="text-white" />
//           )}
//         </button>
//       </div>

//       {/* Game Container */}
//       <div
//         ref={gameContainerRef}
//         onClick={handleClick}
//         className="relative w-[800px] h-[600px] border-4 border-[#FFB86C] rounded-lg overflow-hidden bg-secondary"
//       >
//         {/* Start Screen */}
//         {!gameStarted && !gameOver && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
//             <div className="text-white text-3xl font-bold mb-4">FlyCoin</div>
//             <div className="text-white text-xl">
//               Click or Press Space to Start
//             </div>
//             <div className="mt-4 text-white text-sm">
//               Collect coins for extra points!
//             </div>
//           </div>
//         )}

//         {/* Bird */}
//         <motion.div
//           animate={{
//             rotate: birdRotation,
//             transition: { type: "spring", stiffness: 500 },
//           }}
//           className={`absolute transition-all duration-100 ease-linear ${
//             activeEffects.shield
//               ? "ring-4 ring-blue-400 ring-opacity-50 rounded-full"
//               : ""
//           }`}
//           style={{
//             width: birdWidth,
//             height: birdHeight,
//             left: "100px",
//             top: `${birdPosition}px`,
//           }}
//         >
//           <div className="relative w-full h-full">
//             <div className="absolute inset-0 bg-black rounded-full" />
//             <div className="absolute inset-2 bg-yellow-400 rounded-full">
//               <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white rounded-full" />
//             </div>
//           </div>
//         </motion.div>

//         {/* Obstacles */}
//         <div
//           className="absolute bg-gradient-to-b from-green-600 to-green-500"
//           style={{
//             width: obstacleWidth,
//             height: obstacleHeight,
//             left: obstacleLeft,
//             top: 0,
//           }}
//         >
//           <div className="absolute bottom-0 w-full h-8 bg-green-700 rounded-b-lg" />
//         </div>
//         <div
//           className="absolute bg-gradient-to-b from-green-500 to-green-600"
//           style={{
//             width: obstacleWidth,
//             height: "100%",
//             left: obstacleLeft,
//             top: obstacleHeight + 150,
//           }}
//         >
//           <div className="absolute top-0 w-full h-8 bg-green-700 rounded-t-lg" />
//         </div>

//         {/* Coins */}
//         <AnimatePresence>
//           {coins.map(
//             (coin) =>
//               !coin.collected && (
//                 <motion.div
//                   key={coin.id}
//                   initial={{ scale: 0, rotate: 0 }}
//                   animate={{
//                     scale: 1,
//                     rotate: 360,
//                     transition: {
//                       rotate: {
//                         duration: 1,
//                         repeat: Infinity,
//                         ease: "linear",
//                       },
//                     },
//                   }}
//                   exit={{ scale: 0 }}
//                   className="absolute w-8 h-8"
//                   style={{
//                     left: coin.position.x,
//                     top: coin.position.y,
//                   }}
//                 >
//                   <div className="w-full h-full rounded-full bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center shadow-lg">
//                     <Coins className="w-5 h-5 text-yellow-600" />
//                   </div>
//                 </motion.div>
//               )
//           )}
//         </AnimatePresence>

//         {/* Game Over Screen */}
//         {gameOver && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
//             <div className="text-white text-3xl font-bold mb-4">Game Over!</div>
//             <div className="text-white text-xl mb-2">Score: {score}</div>
//             <div className="text-yellow-400 text-xl mb-4">
//               <div className="flex items-center gap-2">
//                 <Coins className="w-6 h-6" />
//                 <span>Coins Collected: {coinsCollected}</span>
//               </div>
//             </div>
//             {score === highScore && score > 0 && (
//               <div className="text-yellow-400 text-xl mb-4">
//                 New High Score!
//               </div>
//             )}
//             <button
//               onClick={resetGame}
//               className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold"
//             >
//               Play Again
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Achievements */}
//       <div className="mt-4 bg-white/10 rounded-lg p-4 w-[800px]">
//         <div className="text-white font-bold mb-2">Achievements</div>
//         <div className="grid grid-cols-2 gap-4">
//           {achievements.map((achievement) => (
//             <div
//               key={achievement.id}
//               className={`flex items-center gap-2 p-2 rounded-lg ${
//                 achievement.achieved ? "bg-white/20" : "bg-white/5"
//               }`}
//             >
//               {achievement.icon}
//               <div>
//                 <div className="text-white font-bold">{achievement.name}</div>
//                 <div className="text-white/80 text-sm">
//                   {achievement.description}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlyCoinGame;
