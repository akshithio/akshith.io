import React, { useRef, useCallback, useEffect, useState } from "react"
import './App.css'

//@ts-ignore

// Use the x and y coordinates to generate 
// rgb colors in a deterministic manner
const generateColor = (x, y) => {
  const r = Math.floor((x * y * 1234567) % 255)
  const g = Math.floor((x * y * 7654321) % 255)
  const b = Math.floor((x * y * 9876543) % 255)

  return `rgb(${r}, ${g}, ${b})`
}

const generateColorFromGeneration = (gen) => {
  const r = Math.floor((gen * 1234567) % 255)
  const g = Math.floor((255 - gen) % 255)
  const b = Math.floor((255 * 9876543) % 255)

  return `rgb(${r}, ${g}, ${b})`
}

const getWindowDimensions = () => {
  if (typeof window === "undefined") return { width: 0, height: 0 }

  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

// Hook to get window dimensions
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

// Hook to get document visibility
const useWindowVisible = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityChange = "webkitvisibilitychange";
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener(visibilityChange, handleVisibilityChange);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return isVisible
}

const greenSpectrum = [
  "#00FF00",
  "#00EE00",
  "#00CC00",
  "#00AA00",
  "#008800",
  "#006600",
  "#004400",
  "#002200"
];



const GameOfLife = () => {
  const { height, width } = useWindowDimensions()
  const isVisible = useWindowVisible()

  const [generation, setGeneration] = useState(0)

  // Create a ref to store the canvas element
  const canvasRef = useRef(null)

  // Set the cell size
  const cellSize = 4

  // Initialize the grid
  const [grid, setGrid] = useState([])
  const [cells, setCells] = useState({})

  // Initialized the grid
  useEffect(() => {
    const newGrid = []
    for (let i = 0; i < width / cellSize; i++) {
      newGrid[i] = []
      for (let j = 0; j < height / cellSize; j++) {
        // Randomly setting initial state here
        newGrid[i][j] = Math.random() < 0.09 ? 1 : 0
      }
    }
    setGrid(newGrid)
  }, [width, height])

  // Counts the number of alive neighbors for a given cell
  const countAliveNeighbors = useCallback(
    (x, y) => {
      let count = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue
          const row = (x + i + width / cellSize) % (width / cellSize)
          const col = (y + j + height / cellSize) % (height / cellSize)
          if (grid && grid[row] && grid[row][col]) {
            count += grid[row][col] > 0 ? 1 : 0
          }
        }
      }
      return count
    },
    [grid]
  )


  const updateCell = useCallback((x, y, alive, aliveNeighbors) => {
    const position = `${x}.${y}`

    const newCells = { ...cells }
    const cellExistsInPosition = cells.hasOwnProperty(position);

    if (!cellExistsInPosition && alive) {
      // New cell comes alive
      const newGen = cells[position]?.gen ?? 0
      const newColor = greenSpectrum[aliveNeighbors]

      newCells[position] = { aliveNeighbors, gen: newGen, color: 'red' }
    }

    if (cellExistsInPosition) {
      // Update existing cell
      if (aliveNeighbors === 2 || aliveNeighbors === 3) {
        const newGen = cells[position]?.gen ? (cells[position].gen + 1) : 0
        newCells[position] = { aliveNeighbors, gen: newGen, color: cells[position]?.color }
      } else if (aliveNeighbors === 3) {
        const newGen = cells[position]?.gen ? (cells[position].gen + 1) : 0
        const newColor = greenSpectrum[aliveNeighbors]
        newCells[position] = { aliveNeighbors, gen: newGen, color: 'red' }
      } else {
        // Delete existing cell
        // delete newCells[position]
      }
    }
    setCells(newCells)
  }, [cells])

  // Update the grid
  const update = useCallback(() => {
    const newGrid = []

    for (let i = 0; i < width / cellSize; i++) {
      newGrid[i] = []
      for (let j = 0; j < height / cellSize; j++) {
        const aliveNeighbors = countAliveNeighbors(i, j)
        if (grid && grid[i] && grid[i][j] && grid[i][j] > 0) {
          // cell keeps living if it has 2 or 3 neighbours
          const alive = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0
          newGrid[i][j] = alive
          updateCell(i, j, alive, aliveNeighbors)
        } else {
          // new cell comes alive if it has 3 neighbours
          const alive = aliveNeighbors === 3 ? 1 : 0
          newGrid[i][j] = alive
          updateCell(i, j, alive, aliveNeighbors)
        }

      }
    }


    setGrid(newGrid)
  }, [grid, cells])

  // Draw the grid
  const draw = useCallback(() => {
    if (!canvasRef?.current) return

    const ctx = canvasRef.current.getContext("2d")

    // Clear the canvas
    ctx.clearRect(0, 0, width, height)

    // Draw the cells
    for (let i = 0; i < width / cellSize; i++) {
      for (let j = 0; j < height / cellSize; j++) {
        // we don't render cells that are older than 99 generations
        if (grid && grid[i] && grid[i][j]) {
          ctx.fillStyle = generateColor(i, j)
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }
      }
    }
  }, [grid, cells, canvasRef])

  // Allows users to download the canvas as png
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');

    // Create a download link
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = dataURL;

    // Trigger the download
    link.click();
  }

  const animate = () => {
    update()
    draw()
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isVisible) return;
      setGeneration(generation + 1)
      requestAnimationFrame(() => animate())
    }, 30)

    return () => clearInterval(intervalId)
  }, [animate, isVisible])

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <canvas
        width={width}
        height={height}
        className="gameOfLife"
        ref={canvasRef}
      />
      <div
        style={{
          position: "absolute",
          left: 20,
          bottom: 24,
          color: "#fff",
          background: "rgba(64,64,64,0.9)",
          padding: "3px 6px",
          borderRadius: "8px",
          fontSize: "0.9em",
          fontFamily: "Helvitica, sans-serif",
        }}
      >
        Generation {generation}
      </div>
      <div
        onClick={handleDownload}
        style={{
          position: "absolute",
          right: 20,
          bottom: 24,
          color: "#fff",
          background: "rgba(64,64,64,0.9)",
          padding: "3px 6px",
          borderRadius: "8px",
          fontSize: "0.9em",
          fontFamily: "Helvitica, sans-serif",
          zIndex: 999,
          cursor: "pointer",

        }}
      >
        📸
      </div>
    </div>
  )
}

export default GameOfLife
