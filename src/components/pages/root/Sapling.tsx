"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

function SaplingWindow() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [p5, setP5] = useState<any>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const shouldShow = width > 768;
      setShouldLoad(shouldShow);

      setWindowSize({
        width: width,
        height: window.innerHeight,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (shouldLoad && !p5) {
      import("p5").then((p5Module) => {
        const P5Constructor = p5Module.default;
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

      const getScaleFactor = (viewportWidth: number) => {
        if (viewportWidth >= 768 && viewportWidth <= 1024) {
          return 1.3;
        } else if (viewportWidth > 1024) {
          return 0.46;
        }
        return 0.46;
      };

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
        const scaleFactor = getScaleFactor(windowSize.width);
        len = minDimension * scaleFactor;

        initialTilt =
          canvasWidth > 1200 && canvasWidth > canvasHeight ? p.radians(-10) : 0;

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
          const scaleFactor = getScaleFactor(windowSize.width);
          len = minDimension * scaleFactor;

          // Debug logging for resize
          console.log(
            "Resize - Viewport width:",
            windowSize.width,
            "Canvas width:",
            canvasWidth,
            "Scale factor:",
            scaleFactor,
            "Final len:",
            len,
          );

          initialTilt =
            canvasWidth > 1200 && canvasWidth > canvasHeight
              ? p.radians(-15)
              : 0;

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
        const scaleFactor = getScaleFactor(windowSize.width);
        const shouldShiftRight = scaleFactor === 1.3;
        const xOffset = shouldShiftRight ? -100 : 40;

        p.translate(p.width - xOffset, p.height);
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

  if (!shouldLoad) {
    return null;
  }

  return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}

export default SaplingWindow;
