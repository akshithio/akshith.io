"use client";

import { useTheme } from "next-themes";
import p5 from "p5";
import { useEffect, useRef } from "react";

export default function Sapling() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const sketch = (p: p5) => {
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

      const getTreeColor = () => (theme === "dark" ? "#6B8E23" : "#228B23");

      let windInc = 0.01;
      let noisePos = 1;

      p.setup = () => {
        const canvasWidth = canvasRef.current?.offsetWidth || 0;
        const canvasHeight = canvasRef.current?.offsetHeight || 0;
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(0, 0, 0);
        p.stroke(getTreeColor());
        p.translate(p.width - 40, p.height);
        while (generation < targetGenerations) {
          generate();
        }
      };

      p.draw = () => {
        p.clear();
        drawTree();
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
        p.stroke(getTreeColor());

        let stack: {
          len: number;
          angle: number;
          matrix: p5.Matrix;
          depth: number; // Add depth to the stack
        }[] = [];
        let currentDepth = 0; // Initialize current depth

        for (let char of sentence) {
          if (char === "F") {
            let windAngle = p.noise(noisePos + len / 100) * 20;

            // Adjust wind intensity based on depth
            let windIntensity = p.map(currentDepth, 0, targetGenerations, 0, 1); //Map the depth to a 0-1 range.
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
              depth: currentDepth, // Save the current depth
            });
            currentDepth++; // Increase depth when branching
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

    if (canvasRef.current) {
      p5Ref.current = new p5(sketch, canvasRef.current);
    }

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [theme]);

  return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}
