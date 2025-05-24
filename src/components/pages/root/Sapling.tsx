"use client";

import { erika } from "@/utils/fonts";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

function SaplingWindow() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [p5, setP5] = useState<any>(null);

  // Check if we should load based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isLaptopOrLarger = window.innerWidth >= 1024; // Tailwind's laptop breakpoint
      setShouldLoad(isLaptopOrLarger);

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Only load p5 if we should show the component
  useEffect(() => {
    if (shouldLoad && !p5) {
      import("p5").then((p5Module) => {
        // p5.js can export in different ways, try both
        const P5Constructor = p5Module.default || p5Module;
        // Ensure it's a constructor function
        if (typeof P5Constructor === "function") {
          setP5(() => P5Constructor);
        }
      });
    }
  }, [shouldLoad, p5]);

  useEffect(() => {
    if (
      !p5 ||
      !resolvedTheme ||
      !canvasRef.current ||
      windowSize.width === 0 ||
      !shouldLoad
    ) {
      return;
    }

    const treeColor = resolvedTheme === "dark" ? "#6B8E23" : "#228B23";
    const bgColor = resolvedTheme === "dark" ? "#111" : "#eee";

    const sketch = (p: any) => {
      let axiom = "-X";
      let sentence = axiom;
      let rules: { [key: string]: string } = {
        X: "F+[[X]-X]-F[-FX]+X",
        F: "FF",
      };

      let len = 400;
      let angle = p.radians(25);
      let generation = 0;
      const targetGenerations = 7;

      let windInc = 0.01;
      let noisePos = 1;
      let initialTilt = 0;

      p.setup = () => {
        const canvasWidth = canvasRef.current?.offsetWidth || 0;
        const canvasHeight = canvasRef.current?.offsetHeight || 0;

        p.createCanvas(canvasWidth, canvasHeight);
        p.background(bgColor);
        p.stroke(treeColor);

        sentence = axiom;
        len = 400;
        generation = 0;

        const minDimension = p.min(canvasWidth, canvasHeight);
        const isLargeLandscape =
          canvasWidth > 1200 && canvasWidth > canvasHeight;
        const scaleFactor = isLargeLandscape ? 0.46 : 0.46;
        len = minDimension * scaleFactor;
        initialTilt = isLargeLandscape ? p.radians(-10) : 0;

        while (generation < targetGenerations) {
          generate();
        }
      };

      p.draw = () => {
        p.background(bgColor);
        drawTree();
      };

      p.windowResized = () => {
        if (canvasRef.current) {
          const canvasWidth = canvasRef.current.offsetWidth;
          const canvasHeight = canvasRef.current.offsetHeight;
          p.resizeCanvas(canvasWidth, canvasHeight);

          sentence = axiom;

          const minDimension = p.min(canvasWidth, canvasHeight);
          const isLargeLandscape =
            canvasWidth > 1200 && canvasWidth > canvasHeight;
          const scaleFactor = isLargeLandscape ? 0.46 : 0.4;
          len = minDimension * scaleFactor;
          initialTilt = isLargeLandscape ? p.radians(-15) : 0;

          generation = 0;

          while (generation < targetGenerations) {
            generate();
          }
        }
      };

      const generate = () => {
        len *= 0.5;
        let nextSentence = "";

        for (let char of sentence) {
          let found = false;
          for (let rule in rules) {
            if (char === rule) {
              nextSentence += rules[rule];
              found = true;
              break;
            }
          }
          if (!found) {
            nextSentence += char;
          }
        }

        sentence = nextSentence;
        generation++;
      };

      const drawTree = () => {
        p.resetMatrix();
        p.translate(p.width - 40, p.height);
        p.stroke(treeColor);

        if (initialTilt !== 0) {
          p.rotate(initialTilt);
        }

        let stack: {
          len: number;
          angle: number;
          matrix: any;
          depth: number;
        }[] = [];

        let currentDepth = 0;

        for (let char of sentence) {
          if (char === "F") {
            let windAngle = p.noise(noisePos + len / 100) * 20;
            let windIntensity = p.map(currentDepth, 0, targetGenerations, 0, 1);
            windAngle *= windIntensity;

            p.rotate(p.radians(windAngle));
            p.line(0, 0, 0, -len);
            p.translate(0, -len);
            p.rotate(p.radians(-windAngle));
          } else if (char === "+") {
            p.rotate(angle);
          } else if (char === "-") {
            p.rotate(-angle);
          } else if (char === "[") {
            stack.push({
              len: len,
              angle: angle,
              matrix: p.drawingContext.getTransform(),
              depth: currentDepth,
            });
            currentDepth++;
          } else if (char === "]") {
            if (stack.length > 0) {
              const state = stack.pop();
              if (state) {
                len = state.len;
                angle = state.angle;
                p.drawingContext.setTransform(state.matrix);
                currentDepth = state.depth;
              }
            }
            currentDepth--;
          }
        }

        noisePos += windInc;
      };
    };

    if (p5Ref.current) {
      p5Ref.current.remove();
    }

    p5Ref.current = new p5(sketch, canvasRef.current);

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [resolvedTheme, windowSize, p5, shouldLoad]);

  // Don't render anything on mobile
  if (!shouldLoad) {
    return null;
  }

  return (
    <div
      ref={canvasRef}
      className="laptop:block hidden"
      style={{ width: "100%", height: "100vh" }}
    />
  );
}

export default SaplingWindow;
